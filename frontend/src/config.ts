const prod = import.meta.env.MODE === "production";

export const API_URL = prod ? 'https://your-backend-app-name.onrender.com' : 'http://localhost:3000';