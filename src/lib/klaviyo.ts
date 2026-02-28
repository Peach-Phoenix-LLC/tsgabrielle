import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';

const session = new ApiKeySession(process.env.KLAVIYO_API_KEY || '');
const eventsApi = new EventsApi(session);
const profilesApi = new ProfilesApi(session);

export async function trackKlaviyoEvent(metricName: string, email: string, properties: any = {}, value?: number) {
    if (!process.env.KLAVIYO_API_KEY) return;
    try {
        await eventsApi.createEvent({
            data: {
                type: 'event',
                attributes: {
                    profile: {
                        $email: email,
                    },
                    metric: {
                        name: metricName,
                    },
                    properties: properties,
                    value: value,
                    time: new Date().toISOString(),
                }
            } as any
        });
        
    } catch (e: any) {
        console.error('Klaviyo event tracking error:', e?.response?.body || e.message || e);
    }
}

export async function syncKlaviyoProfile(email: string, traits: any = {}) {
    if (!process.env.KLAVIYO_API_KEY) return;
    try {
        await profilesApi.createProfile({
            data: {
                type: 'profile',
                attributes: {
                    email: email,
                    first_name: traits.first_name,
                    last_name: traits.last_name,
                    phone_number: traits.phone,
                    properties: { ...traits }
                }
            } as any
        });
        
    } catch (e: any) {
        console.error('Klaviyo profile sync error:', e?.response?.body || e.message || e);
    }
}
