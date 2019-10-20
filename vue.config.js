// const path = require('path');
// module.exports = {
//     configureWebpack: {
//         resolve: {
//             alias: {
//                 '@': path.join(__dirname, 'src'),
//                 'api': path.join(__dirname, 'src/api'),
//                 'common': path.join(__dirname, 'src/common'),
//                 'components': path.join(__dirname, 'src/components'),
//                 'views': path.join(__dirname, 'src/views')
//             },
//         },
//     },
// };



// const path = require("path");
// function resolve(dir) {
//     return path.join(__dirname, dir);
// }
// module.exports = {
//     lintOnSave: true,
//     // 生产环境是否生成 sourceMap 文件
//     productionSourceMap: false,
//     // 开启 CSS source maps?
//     css: {
//         sourceMap: false,
//     },
//     chainWebpack: config => {
//         config.resolve.alias
//             .set("@", resolve("src"))
//             .set("common", resolve("src/common"));
//     }
// };

// const path = require("path");

// function resolve(dir) {
//     return path.join(__dirname, dir);
// }
// module.exports = {
//     chainWebpack: config => {
//         config.resolve.alias
//             .set("@", resolve("src"))
//             .set("common", resolve("src/common"))
//     },
// }

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },
}