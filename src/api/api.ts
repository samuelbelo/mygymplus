// @ts-ignore
import axios from "axios";
import router from "../router";

export default ({ requiresAuth = false }) => {
	const options = { baseURL: "", headers: { Authorization: "" } };

	options.baseURL = "https://minha-academia-plus-api.azurewebsites.net/";

	if (requiresAuth) {
		options.headers.Authorization = "";
	}

	const instance = axios.create(options);

	instance.interceptors.response.use((response: any) => {
		return response;
	}, (error: any) => {
		return Promise.reject(error);
	});

	instance.interceptors.request.use((request: any) => {
		const token = localStorage.getItem("tokenAcesso");
		if (token) {
			// @ts-ignore
			request.headers["Authorization"] = `Bearer ${token}`;
		} else {
			router.push("/login");
		}
		return request
	});


	return instance;
};
