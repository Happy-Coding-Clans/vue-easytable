/*
 * dependence on https://github.com/axios/axios
 * */

import axios from "axios";

const service = axios.create({});

// request interceptor
service.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default service;
