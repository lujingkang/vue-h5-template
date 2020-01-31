export function request(inOpts = {}, inResult = {}, inStatus = {}) {
    const {statusCode = 0} = inStatus;
    const {data = {}} = inOpts;
    // eslint-disable-next-line no-console
    console.group('发送请求');
    // eslint-disable-next-line no-console
    console.log('请求参数:');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data || {}));
    // eslint-disable-next-line no-console
    console.log('返回:');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(inResult));
    // eslint-disable-next-line no-console
    console.groupEnd();
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            switch (statusCode) {
                case 0:
                    resolve(inResult);
                    break;
                case 401:
                case 412:
                case 403:
                case 410:
                case 500:
                    reject(inResult);
                    break;
                default:
                    break;
            }
        },500);
    });

}
