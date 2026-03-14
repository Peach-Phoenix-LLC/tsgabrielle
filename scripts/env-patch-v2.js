const { execSync } = require('child_process');

function updateEnv(name, value) {
    console.log(`Updating ${name}...`);
    try {
        execSync(`npx vercel env rm ${name} production --yes`, { stdio: 'inherit' });
    } catch (e) { }
    execSync(`npx vercel env add ${name} production --yes`, { input: value, stdio: ['pipe', process.stdout, process.stderr] });
}

// 6543 is the pooler port, which has IPv4 support.
// Adding ?pgbouncer=true to DATABASE_URL is required for Prisma when using pgbouncer transaction mode.
updateEnv('DATABASE_URL', 'postgresql://postgres:P%40risAZ2026*@db.waoklslnherhziscjbnc.supabase.co:6543/postgres?pgbouncer=true');
updateEnv('DIRECT_URL', 'postgresql://postgres:P%40risAZ2026*@db.waoklslnherhziscjbnc.supabase.co:5432/postgres');

console.log('DONE');
