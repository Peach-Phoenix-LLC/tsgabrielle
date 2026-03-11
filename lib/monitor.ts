
/**
 * Monitor utility for Vercel Runtime Logs and Make.com integration.
 * Ensures structured logging that can be parsed by Vercel Log Drains.
 */

type LogEvent = 'checkout_started' | 'checkout_error' | 'payment_success' | 'payment_failed' | 'printful_sync_error' | 'inventory_sync';

interface LogPayload {
  event: LogEvent;
  data?: any;
  error?: any;
  orderId?: string;
  userId?: string;
  email?: string;
  timestamp?: string;
}

export async function logEvent(payload: LogPayload) {
  const fullPayload = {
    ...payload,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    site: 'tsgabrielle'
  };

  // 1. Log to Vercel (Standard Console)
  // Using JSON.stringify makes it easy for Vercel Log Drains (like BetterStack, Axiom, or Make.com) to parse
  if (payload.event.includes('error') || payload.event.includes('failed')) {
    console.error(JSON.stringify(fullPayload));
  } else {
    console.log(JSON.stringify(fullPayload));
  }

  // 2. Optional: Direct Make.com Webhook (if configured)
  const MAKE_MONITOR_WEBHOOK = process.env.MAKE_MONITOR_WEBHOOK;
  if (MAKE_MONITOR_WEBHOOK) {
    try {
      // Use fire-and-forget or await depending on criticality
      fetch(MAKE_MONITOR_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      }).catch(err => console.error('Failed to send to Make.com Webhook:', err));
    } catch (err) {
      // Silently fail webhook to avoid breaking the main flow
    }
  }
}

export const monitor = {
  checkoutStarted: (data: any) => logEvent({ event: 'checkout_started', data }),
  checkoutError: (error: any, data?: any) => logEvent({ event: 'checkout_error', error, data }),
  paymentSuccess: (orderId: string, email: string, data?: any) => logEvent({ event: 'payment_success', orderId, email, data }),
  paymentFailed: (orderId: string, error: any) => logEvent({ event: 'payment_failed', orderId, error }),
  printfulError: (error: any, orderId?: string) => logEvent({ event: 'printful_sync_error', error, orderId }),
};
