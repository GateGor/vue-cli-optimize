const path = require('path')

function resolve(dir) {
    return path.join(__dirname,'./',dir)
}

module.exports = {
    chainWebpack:config =>{
        //这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
        config.plugin('define').tap(args => {
            //Process.argv的用法是 第一个是node 第二个是脚本文件 第三个是打印的任意参数
            const argv = process.argv
            console.log(argv);
            
            const mode = argv[argv.indexOf('--project-mode') + 1]
            console.log(mode);
            console.log('1----',args);
            
            args[0]['process.env'].MODE = `"${mode}"`
            args[0]['process.env'].BASE_API = '"http://192.168.3.212:8070"'
            console.log('2----',args);
            return args
        })
        //svg loader
        const svgRule = config.module.rule('svg') //找到svg-loader
        svgRule.uses.clear() //清除已有的loader,如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) //正则匹配排除node_modules目录
        svgRule //添加svg新的loader处理
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId:'icon-[name]'
        })

        //修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    }
}