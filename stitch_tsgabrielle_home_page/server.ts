import express from 'express';
import * as path from 'path';

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);

// Serve static files from the root directory
app.use(express.static(__dirname));

// Default route to list pages
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>tsgabrielle® Site Index</title>
            <style>
                body { font-family: sans-serif; padding: 2rem; line-height: 1.5; background-color: #f7f6f8; color: #1d131f; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 0.5rem; }
                a { color: #bf12de; text-decoration: none; font-weight: bold; font-size: 1.1rem; }
                a:hover { text-decoration: underline; }
                h1 { color: #bf12de; }
            </style>
        </head>
        <body>
            <h1>tsgabrielle® Website</h1>
            <p>Select a page to view:</p>
            <ul>
                <li><a href="/tsgabrielle®_homepage/code.html"><b>Homepage (2026 Official Catalogue)</b></a></li>
                <li><a href="/tsgabrielle®_the_brand_page/code.html">The Brand Page</a></li>
                <li><a href="/tsgabrielle®_legal_and_sitemap_page/code.html">Legal Hub (Policies)</a></li>
                <li><a href="/tsgabrielle®_privacy_policy/code.html">Privacy Policy</a></li>
                <li><a href="/tsgabrielle®_terms_of_service/code.html">Terms of Service</a></li>
                <li><a href="/tsgabrielle®_refund_policy/code.html">Refund Policy</a></li>
                <li><a href="/tsgabrielle®_cookie_policy/code.html">Cookie Policy</a></li>
                <li><a href="/tsgabrielle®_disclaimer_page/code.html">Disclaimer</a></li>
                <li><a href="/tsgabrielle®_accessibility_statement/code.html">Accessibility Statement</a></li>
                <li><a href="/tsgabrielle®_dmca_policy/code.html">DMCA Policy</a></li>
                <li><a href="/tsgabrielle®_community_guidelines/code.html">Community Guidelines</a></li>
                <li><a href="/tsgabrielle®_affiliate_disclosure/code.html">Affiliate Disclosure</a></li>
                <li><a href="/tsgabrielle®_copyright_notice/code.html">Copyright Notice</a></li>
                <li><a href="/tsgabrielle®_admin_dashboard_overview/code.html">Admin Dashboard</a></li>
                <li><a href="/tsgabrielle®_admin_product_management/code.html">Product Management</a></li>
            </ul>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});