// if the application is running locally, API requests will
// be made to the local development server.
let backendHost = "http://localhost:8080";

// 'window.location.hostname' will be assigned to 'hostname' 
// only if all three values are truthy.
const hostname = window && window.location && window.location.hostname;

// if the application is not running on the local system
if (hostname !== "localhost") {
    backendHost = "dunno, as of now";
} 

export const API_BASE_URL = `${backendHost}`;