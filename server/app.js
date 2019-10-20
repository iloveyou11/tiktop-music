// 代理请求
var express = require('express')
var app = express()
var apiRoutes = express.Router()
var axios = require('axios')

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

apiRoutes.get('/getDiscList', function(req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        //console.log(response);
        res.json(response.data)
    }).catch((e) => {
        console.log(e);
    })
})

apiRoutes.get('/lyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        //  由于response 是一个jsonp格式的 所以我们要对这个 进行json转化
        var result = response.data;
        // console可以打印出来，进行正则匹配
        var regExe = /^\w+\(({[^()]+})\)$/
        var matchArr = result.match(regExe);
        if (matchArr) {
            res.json(JSON.parse(matchArr[1]));
        }
    }).catch((e) => {
        console.log(e);
    })
})

app.use('/api', apiRoutes);
app.listen(9000, () => {
    console.log('listening on 9000...');
})