require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
    try {
        console.log('Fetching from page_content...');
        const { data, error } = await supabase
            .from('page_content')
            .select('*')
            .limit(1);
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            console.log('Columns found in first row:');
            console.log(Object.keys(data[0]));
        } else {
            console.log('No data in page_content table.');
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkSchema();
