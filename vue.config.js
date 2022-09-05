const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve('src/assets'));
        //添加svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/) //设置test
            .include.add(resolve('src/assets')) //加入include
            .end() //add完上下文进入数组，使用end回退
            .use('svg-sprite-loader') //添加loader
            .loader('svg-sprite-loader') //切换上下文到loader
            .options({ symbolId: 'icon-[name]' })
            .end();
    }
};