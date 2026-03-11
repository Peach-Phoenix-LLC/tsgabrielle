const KLAVIYO_API_URL = "https://a.klaviyo.com/api";

const headers = {
  Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
  accept: "application/json",
  "content-type": "application/json",
  revision: "2023-02-22",
};

/**
 * Subscribes a profile to a Klaviyo list.
 */
export async function subscribeProfileToList(email: string, listId: string) {
  const url = `${KLAVIYO_API_URL}/lists/${listId}/subscriptions`;
  const payload = {
    data: {
      type: "subscription",
      attributes: {
        profiles: [{ data: { type: "profile", attributes: { email } } }],
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return response;
}

/**
 * Tracks a client-side event in Klaviyo.
 */
export async function trackClientEvent(
  email: string,
  eventName: string,
  properties: Record<string, any>
) {
  const url = `${KLAVIYO_API_URL}/events`;
  const payload = {
    data: {
      type: "event",
      attributes: {
        profile: {
          data: {
            type: "profile",
            attributes: {
              email,
            },
          },
        },
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: eventName,
            },
          },
        },
        properties,
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return response;
}

/**
 * Tracks a server-side event in Klaviyo.
 */
export async function trackServerEvent(
  email: string,
  eventName: string,
  properties: Record<string, any>
) {
  return trackClientEvent(email, eventName, properties);
}
