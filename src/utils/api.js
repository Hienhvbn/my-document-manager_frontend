import axios from 'axios';

const createUserApi = (name, email, password) => {
	const URL_API = "http://localhost:8080/v1/api/register";
	const data = {
		name, email, password
	}
	return axios.post(URL_API, data)
}

const loginApi = (email, password) => {
	const URL_API = "http://localhost:8080/v1/api/login";
	const data = {
		email, password
	}
	return axios.post(URL_API, data)
}

export {createUserApi, loginApi}