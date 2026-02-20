const getApiBaseUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // Ensure the URL has a protocol
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }

    // Remove trailing slash if present
    return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const API_BASE_URL = getApiBaseUrl();
