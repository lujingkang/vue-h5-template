const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default process.env.VUE_APP_CURRENTMODE === 'mock' ? require('../mock/index').default : modules
