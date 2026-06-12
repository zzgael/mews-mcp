/**
 * Simple POST request to Mews API with authentication in body
 */
export async function mewsRequest(config, endpoint, data) {
    const url = `${config.baseUrl}${endpoint}`;
    const body = {
        ClientToken: config.clientToken,
        AccessToken: config.accessToken,
        Client: config.client,
        ...data,
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Mews API request failed: ${response.status} ${response.statusText}. ${errorText}`);
        }
        // Handle empty responses
        const contentLength = response.headers.get('content-length');
        if (contentLength === '0') {
            return {};
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Mews API request failed: ${error.message}`);
        }
        throw new Error('Unknown error occurred during Mews API request');
    }
}
//# sourceMappingURL=http.js.map