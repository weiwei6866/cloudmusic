import axios from 'axios';

const request = axios.create({
    baseURL:'http://localhost:3000/',
    timeout:'5000'
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use(
(res)=>{
    return res.data
},
(error)=>{
    console.log(error);
    return Promise.reject()
})

export default request