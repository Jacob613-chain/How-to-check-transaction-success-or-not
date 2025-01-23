import { HttpClient, Api } from 'tonapi-sdk-js';

const API_KEY = "AFLKGNP4S7W7WPQAAAAGMB7I424QHI53UCHCAB64FCOVHRWHSFZW2VFJTWCISBK4YHJBDQA";

// Configure the HTTP client with your host and token
const httpClient = new HttpClient({
    baseUrl: 'https://tonapi.io',
    baseApiParams: {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-type': 'application/json',
        },
    },
});

// Initialize the API client
const client = new Api(httpClient);

(async () => {
    try {
        const trace = await client.traces.getTrace("70db1417c2d783d6aaf6b3782d2ccc665b8034bc92cceceeb69e0589833caabe");
        console.log(isTraceSuccess(trace))
    } catch (error) {
        console.error('Error fetching trace:', error.message, error.cause);
    }
})();

function isTraceSuccess(trace) {
    if (!trace.transaction.success) {
        console.log(trace.transaction);
        return { isSuccess: false, errorTransaction: trace.transaction };
    }
    if (trace.children) {
        for (let i = 0; i < trace.children.length; i++) {
            const res = isTraceSuccess(trace.children[i]);
            if (!res.isSuccess) {
                return { isSuccess: false, errorTransaction: res.errorTransaction };
            }
        }
    }

    return { isSuccess: true, errorTransaction: undefined };
}
