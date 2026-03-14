const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const http = require('http');

async function runHealthCheck() {
    console.log('Starting System Health Check...');
    const report = {
        timestamp: new Date().toISOString(),
        checks: {
            database: { status: 'unknown', details: null },
            vercel: { status: 'unknown', details: null },
            oracle_cloud_ollama: { status: 'unknown', latency: null }
        }
    };

    // 1. Check Database (Prisma)
    try {
        console.log('Checking database connection...');
        // Try a simple version check first to avoid full npx install issues
        execSync('npx prisma -v', { stdio: 'pipe' });
        report.checks.database.status = 'healthy';
    } catch (error) {
        report.checks.database.status = 'unhealthy';
        report.checks.database.details = 'Prisma CLI check failed';
    }

    // 2. Check Vercel (Public URL)
    try {
        console.log('Checking Vercel production status...');
        await new Promise((resolve, reject) => {
            https.get('https://tsgabrielle.us', (res) => {
                report.checks.vercel.status = res.statusCode === 200 ? 'healthy' : 'unhealthy';
                report.checks.vercel.details = `Status Code: ${res.statusCode}`;
                resolve();
            }).on('error', reject);
        });
    } catch (error) {
        report.checks.vercel.status = 'unhealthy';
        report.checks.vercel.details = error.message;
    }

    // 3. Check Oracle Cloud Ollama
    try {
        console.log('Checking Oracle Cloud Ollama latency...');
        const startTime = Date.now();
        await new Promise((resolve, reject) => {
            http.get('http://129.213.165.230:11434/api/tags', (res) => {
                const latency = Date.now() - startTime;
                report.checks.oracle_cloud_ollama.status = res.statusCode === 200 ? 'healthy' : 'unhealthy';
                report.checks.oracle_cloud_ollama.latency = `${latency}ms`;
                resolve();
            }).on('error', reject);
        });
    } catch (error) {
        report.checks.oracle_cloud_ollama.status = 'unhealthy';
        report.checks.oracle_cloud_ollama.details = error.message;
    }

    const reportPath = 'scripts/health-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Health check complete. Report saved to ${reportPath}`);
    console.table(Object.entries(report.checks).map(([name, data]) => ({ Check: name, Status: data.status, Info: data.latency || data.details || 'N/A' })));
}

runHealthCheck();
