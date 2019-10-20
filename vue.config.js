const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                'api': path.join(__dirname, 'src/api'),
                'common': path.join(__dirname, 'src/common'),
                'components': path.join(__dirname, 'src/components'),
                'views': path.join(__dirname, 'src/views')
            },
        },
    },
};