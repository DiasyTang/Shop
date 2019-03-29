import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import config from "../../config"

axios.defaults.timeout = 15000;
axios.defaults.baseURL = process.env.NODE_ENV === "development" ?
    config.baseUrl.dev : config.baseUrl.pro;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//http request拦截器
axios.interceptors.request.use(config => {
    if (config.url != "/user/login") {
        config.headers["Authorization"] = 'Bearer ' + Vue.cookie.get("token");
    }
    return config;
}, err => {
    Promise.reject(err);
});

//response拦截器
axios.interceptors.response.use(response => {
    if (!response.data.isSuccess) {
        if (response.data.responseCode === 401) {
            router.push({
                path: '/login'
            });
            throw new Error(response.data.message);
        }
        if (response.data.responseCode === 403) {
            router.push({
                path: "/403"
            });
            throw new Error(response.data.message);
        }
    }
    return response;
}, error => {
    return Promise.reject(error);
});

//封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}

//封装post方法
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}


