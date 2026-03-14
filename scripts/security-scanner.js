const https = require('https');
const fs = require('fs');

async function runSecurityAudit(domain) {
    console.log(`Starting Robust Security Audit for: ${domain}`);
    const results = {
        domain,
        timestamp: new Date().toISOString(),
        vulnerabilities: [],
        score: 100
    };

    // 1. Check for sensitive files with content-type validation
    const sensitiveFiles = ['.env', '.git/config', 'package-lock.json', '.env.local'];
    for (const file of sensitiveFiles) {
        try {
            const { statusCode, headers } = await getResponseInfo(`https://${domain}/${file}`);
            const contentType = headers['content-type'] || '';
            
            // If it returns 200 but it's HTML, it's likely a 404 page (catch-all route)
            if (statusCode === 200 && !contentType.includes('text/html')) {
                results.vulnerabilities.push({
                    severity: 'CRITICAL',
                    type: 'Information Disclosure',
                    message: `Sensitive file exposed: ${file} (Type: ${contentType})`
                });
                results.score -= 25;
            } else if (statusCode === 200 && contentType.includes('text/html')) {
                console.log(`Note: ${file} returned 200 but is HTML (likely 404 page). Skipping.`);
            }
        } catch (e) {}
    }

    // 2. Check Security Headers (case-insensitive)
    try {
        const headers = await getHeaders(`https://${domain}`);
        const requiredHeaders = [
            'x-frame-options',
            'x-content-type-options',
            'strict-transport-security',
            'referrer-policy'
        ];

        for (const header of requiredHeaders) {
            const foundHeader = Object.keys(headers).find(h => h.toLowerCase() === header);
            if (!foundHeader) {
                results.vulnerabilities.push({
                    severity: 'MEDIUM',
                    type: 'Missing Header',
                    message: `Security header missing: ${header}`
                });
                results.score -= 5;
            } else {
                console.log(`Header found: ${header} = ${headers[foundHeader]}`);
            }
        }
    } catch (error) {
        results.vulnerabilities.push({
            severity: 'HIGH',
            type: 'Connection Error',
            message: `Failed to fetch headers: ${error.message}`
        });
    }

    const reportPath = 'scripts/security-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Audit complete. Report saved to ${reportPath}`);
    console.log(`Security Score: ${Math.max(0, results.score)}%`);
    return results;
}

function getResponseInfo(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            resolve({ statusCode: res.statusCode, headers: res.headers });
        }).on('error', reject);
    });
}

function getHeaders(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            resolve(res.headers);
        }).on('error', reject);
    });
}

const targetDomain = process.argv[2] || 'tsgabrielle.us';
runSecurityAudit(targetDomain);
