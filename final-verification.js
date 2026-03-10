const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    console.log("--- 1. DATABASE CHECK ---");
    try {
        const count = await prisma.product.count();
        const p = await prisma.product.findFirst();
        if (p) {
            console.log('? Supabase: Online. Total Products: ' + count + '. Sample: ' + p.title);
        } else {
            console.log('? Supabase: Online. Total Products: ' + count);
        }
    } catch (e) {
        console.log("? Supabase Error: " + e.message);
    }

    console.log("\n--- 2. RESEND EMAIL CHECK ---");
    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer re_NyQyDpA5_Q2cjfFWkAJWuP3GgtoSst67j',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: 'contact@tsgabrielle.us',
                subject: 'tsgabrielle® USA - Systems Verification',
                html: '<p><strong>tsgabrielle® USA</strong>: Your Resend email integration is working perfectly! The backend infrastructure is online.</p>'
            })
        });
        const data = await res.json();
        if (data.id) {
            console.log('? Resend Email: Sent successfully! Check your inbox for contact@tsgabrielle.us');
        } else {
            console.log('? Resend Error: ', data);
        }
    } catch (e) {
        console.log("? Resend Fetch Error: " + e.message);
    }

    console.log("\n--- 3. LIVE SITE PING ---");
    try {
        const res = await fetch('https://tsgabrielle.us');
        console.log('? Live Site: https://tsgabrielle.us returned status ' + res.status);
    } catch (e) {
        console.log('? Live Site Ping Error: ' + e.message);
    }
}
run().then(() => process.exit(0));
