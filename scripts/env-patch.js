const { execSync } = require('child_process');
execSync('npx vercel env add DATABASE_URL production --yes', { input: Buffer.from('postgresql://postgres:P%40risAZ2026*@db.waoklslnherhziscjbnc.supabase.co:5432/postgres'), stdio: 'inherit' });
