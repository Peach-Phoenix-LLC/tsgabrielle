const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function processMessage(msg) {
  console.log(`Processing message from web: "${msg.content}"`);
  
  let reply = "";
  try {
    console.log(`OpenClaw: Executing agent for message: "${msg.content}"`);
    // Run OpenClaw agent locally to get response from Oracle Cloud
    const output = execSync(`openclaw agent --agent main --message "${msg.content.replace(/"/g, '\\"')}" --json`, { 
      encoding: 'utf8',
      timeout: 60000 
    });
    
    const data = JSON.parse(output);
    reply = data.text || data.message || "Done. Processed by Peach AI.";
  } catch (agentErr) {
    console.error('OpenClaw Execution Error:', agentErr.message);
    
    const jsonMatch = (agentErr.stdout || "").match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        try {
            const data = JSON.parse(jsonMatch[0]);
            reply = data.text || data.message || "Processed with some noise.";
        } catch(e) {
            reply = `Peach is online but the brain returned a formatting error.`;
        }
    } else {
        reply = `Peach brain error. Gateway status: ${execSync('openclaw status --plain', { encoding: 'utf8' }).split('\n')[0]}`;
    }
  }

  await supabase
    .from('peach_messages')
    .update({ processed: true, reply: reply })
    .eq('id', msg.id);
    
  console.log('Reply sent back to Supabase.');
}

async function startBridge() {
  console.log('🍑 Peach Realtime Bridge: Starting up...');

  // 1. Process any missed messages first
  const { data: initialMessages, error: initialError } = await supabase
    .from('peach_messages')
    .select('*')
    .eq('processed', false)
    .order('created_at', { ascending: true });

  if (initialError) {
    console.error('Error fetching initial messages:', initialError.message);
  } else if (initialMessages && initialMessages.length > 0) {
    console.log(`Processing ${initialMessages.length} missed messages...`);
    for (const msg of initialMessages) {
      await processMessage(msg);
    }
  }

  // 2. Subscribe to new messages
  console.log('Monitoring for new messages via Realtime...');
  
  supabase
    .channel('peach_new_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'peach_messages',
        filter: 'processed=eq.false'
      },
      (payload) => {
        console.log('New message received via Realtime!');
        processMessage(payload.new);
      }
    )
    .subscribe((status) => {
      console.log(`Realtime subscription status: ${status}`);
    });
}

startBridge();
