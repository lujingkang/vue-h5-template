import axios from 'axios'

axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    const {data} = response;
    const {statusCode} = data;
    switch (statusCode) {
        case 0:
            return response;
        case 401: //（未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
        case 403: //（禁止）服务器拒绝请求
        case 410: //要获取的资源已经不存在或已删除
        case 412: //（未满足前提条件）参数不合法
        case 500: //服务器处理发生异常
            return Promise.reject(data.error);
        default:
    }
}, error => {
    // 对响应错误做点什么
    return Promise.resolve(error)
});


export default {
    request({
                url = process.env.VUE_APP_cgiUrl,
                data = {},
                cmd = ''
            }) {
        let queryData = {
            cmd: cmd,
            parameters: {
                ...data
            },
        };
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'post',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
                responseType: 'json',
                // withCredentials: true,
                timeout: 30000,//指定请求超时的毫秒数(0 表示无超时时间)
                data: queryData
            }).then(
                (response) => {
                    let res = response.data.response;
                    if (res.success) {
                        resolve(res.data)
                    } else {
                        reject(res.data)
                    }
                }
            ).catch(
                (error) => {
                    reject(error)
                }
            );
        })
    },
}
