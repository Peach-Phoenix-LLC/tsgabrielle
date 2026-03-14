const { execSync } = require('child_process');
require('dotenv').config({ path: '.env' });

try {
    console.log('Running prisma db push...');
    execSync('npx prisma db push', {
        stdio: 'inherit',
        env: { ...process.env }
    });
    console.log('Success!');
} catch (error) {
    console.error('Failed to push schema:', error.message);
    process.exit(1);
}
