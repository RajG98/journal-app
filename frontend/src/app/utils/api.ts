const { default: axios } = require("axios");

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

api.interceptors.request.use((config: { headers: { [x: string]: any } }) => {
	const jwtToken = sessionStorage.getItem("jwt-token");
	if (jwtToken) {
		config.headers["Authorization"] = `Bearer ${jwtToken}`;
	}
	return config;
});

api.interceptors.response.use(
	(response: any) => response,
	(error: any) => {
		if (
			error.response &&
			(error.response.status === 401 || error.response.status === 403)
		) {
			window.location.href = "/login?expired=true";
		}
		return Promise.reject(error);
	}
);

export default api;
