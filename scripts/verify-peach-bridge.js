require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyBridge() {
    console.log('--- Peach Bridge Verification ---');
    
    // 1. Insert test message
    const testId = '00000000-0000-0000-0000-000000000000'; // Temporary ID for cleanup
    console.log('Sending test message: "Hello Peach, respond with TEST_SUCCESS if you can hear me."');
    
    const { data, error } = await supabase
        .from('peach_messages')
        .insert({
            role: 'user',
            content: 'Hello Peach, respond with TEST_SUCCESS if you can hear me.',
            processed: false
        })
        .select()
        .single();

    if (error) {
        console.error('FAILED: Could not insert message into Supabase:', error.message);
        process.exit(1);
    }

    const messageId = data.id;
    console.log(`Message inserted with ID: ${messageId}. Waiting for bridge processing...`);

    // 2. Poll for reply (max 60 seconds)
    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const { data: pollData } = await supabase
            .from('peach_messages')
            .select('*')
            .eq('id', messageId)
            .single();

        if (pollData && pollData.processed) {
            console.log('SUCCESS: Bridge processed the message!');
            console.log('Peach Reply:', pollData.reply);
            
            // Cleanup
            await supabase.from('peach_messages').delete().eq('id', messageId);
            console.log('Test record cleaned up.');
            return;
        }
        console.log(`Waiting... (${(i+1)*2}s)`);
    }

    console.error('FAILED: Bridge did not process the message within 20 seconds.');
    process.exit(1);
}

verifyBridge();
