import axios from "./axios.js";

const API = "http://localhost:3000/api";

export const registerRequest = async (user) => axios.post(`/register`, user);


export const loginRequest = (user) => axios.post (`/login`, user)

// verificar token
export const verifyTokenRequest = ()=> axios.get('/verify')






// // 
// export const registerRequest = (user) => axios.post(`${API}/register`, user);


// export const loginRequest = user => axios.post (`${API}/login`, user)