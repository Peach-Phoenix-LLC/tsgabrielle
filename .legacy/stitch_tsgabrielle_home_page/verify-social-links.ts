import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

const SOCIAL_LINKS = [
    'https://x.com/tsgabrielle3',
    'https://www.instagram.com/tsgabrielle3',
    'https://www.tiktok.com/@tsgabrielle3',
    'https://www.facebook.com/tsgabrielle3',
    'https://www.youtube.com/@tsgabrielle3',
    'https://www.pinterest.com/tsgabrielle3/',
    'https://www.linkedin.com/company/tsgabrielle/',
    'https://www.snapchat.com/@tsgabrielle3'
];

function checkUrl(urlString: string): Promise<void> {
    return new Promise((resolve) => {
        const url = new URL(urlString);
        const options = {
            method: 'GET', // GET is often more reliable than HEAD for social platforms
            headers: {
                // User-Agent is required to avoid immediate blocking by some platforms
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Google Cloud Shell',
                'X-Cloud-Shell-Client': '1'
            }
        };

        const requestModule = url.protocol === 'https:' ? https : http;

        const req = requestModule.request(url, options, (res) => {
            const status = res.statusCode || 0;
            let icon = '✅';
            let note = '';

            if (status >= 400) {
                icon = '❌';
                // Common anti-bot response codes
                if (status === 999 && urlString.includes('linkedin')) {
                    icon = '⚠️';
                    note = ' (LinkedIn Bot Protection)';
                } else if ((status === 403 || status === 429) && (urlString.includes('google') || urlString.includes('youtube'))) {
                    icon = '⚠️';
                    note = ' (Google/YouTube Rate Limit)';
                } else if (status === 403 || status === 429) {
                    icon = '⚠️';
                    note = ' (Likely Bot Protection/Rate Limit)';
                }
            } else if (status >= 300) {
                icon = 'Zw'; // Redirect
                note = ` -> ${res.headers.location || 'Redirect'}`;
            }

            console.log(`${icon} [${status}] ${urlString}${note}`);

            res.resume(); // Consume response to free memory
            resolve();
        });

        req.on('error', (e) => {
            console.error(`❌ [ERROR] ${urlString}: ${e.message}`);
            resolve();
        });

        req.end();
    });
}

async function verifyLinks() {
    console.log('Verifying Social Media Links for tsgabrielle®...');
    console.log('------------------------------------------------');

    // Run sequentially to avoid triggering aggressive rate limiters
    for (const link of SOCIAL_LINKS) {
        await checkUrl(link);
    }
    console.log('------------------------------------------------');
    console.log('Note: Social media platforms often block scripts. A 200, 301, or 302 usually indicates the link is valid.');
}

verifyLinks();