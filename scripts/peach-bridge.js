const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function startBridge() {
  console.log('🍑 Peach Bridge: Monitoring Supabase for messages...');
  
  while (true) {
    try {
      const { data: messages, error } = await supabase
        .from('peach_messages')
        .select('*')
        .eq('processed', false)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (messages && messages.length > 0) {
        for (const msg of messages) {
          console.log(`Processing message from web: "${msg.content}"`);
          
          let reply = "";
          try {
            // Run OpenClaw agent locally to get response from Oracle Cloud
            const output = execSync(`openclaw agent --agent main --message "${msg.content}" --plain`, { encoding: 'utf8' });
            
            // Clean up the output to get just the message
            reply = output.replace(/🦞[\s\S]*?◇/g, '').trim();
            if (!reply) reply = "I've processed your request. Check the site for changes!";
          } catch (agentErr) {
            console.error('OpenClaw Error:', agentErr.message);
            reply = "Peach encountered a local processing error. Make sure OpenClaw is configured correctly.";
          }

          await supabase
            .from('peach_messages')
            .update({ processed: true, reply: reply })
            .eq('id', msg.id);
            
          console.log('Reply sent back to Supabase.');
        }
      }
    } catch (err) {
      console.error('Bridge Error:', err.message);
    }
    
    // Poll every 2 seconds
    await new Promise(r => setTimeout(r, 2000));
  }
}

startBridge();
