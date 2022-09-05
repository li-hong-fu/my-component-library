import MySvgIcon from './src/icon.vue';

// const req = require.context('../../assets/svg', false, /\.svg$/);
// const requireAll = requireContext => requireContext.keys().map(requireContext);
// requireAll(req);

//图标自动导入
//利用webpack 的require.context自动导入
//返回的req是只去加载svg目录中的模块的函数
const req = require.context('../../assets/svg', false, /\.svg$/);
req.keys().map(req);


MySvgIcon.install = function install(Vue) {
    Vue.component(MySvgIcon.name, MySvgIcon);
};

export default MySvgIcon;