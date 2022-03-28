let http = require('http');
let url = require('url');
let port = process.argv[2];
let fs = require('fs');

if (!port) {
    console.log('请指定端口号');
    process.exit(1);
}
let server = http.createServer(function (req, res) {
    let params = url.parse(req.url, true)
    let pathWithQuery = req.url
    console.log(params)
    let path = params.pathname
    let query = params.query
    console.log('有请求发送过来了！路径是' + pathWithQuery)

    if(path === '/'){
        path = '/index.html'
    }
    let suffix = path.substring(path.lastIndexOf('.')+1)
    let contentMap = {
        'html':'text/html',
        'js':'text/javascript',
        'css':'text/css',
        'json':'application/json',
        'xml':'text/xml',
        'png':'image/png',
        'jpg':'image/jpeg',
        'gif':'image/gif'
    }
    res.statusCode = 200
    
    res.setHeader('Content-Type', `${contentMap[suffix] || 'text/html' } ;charset=utf-8`)
    let content;
    try{
        content = fs.readFileSync(`public${path}`)
    }catch(error){
        res.statusCode = 404
        content = '文件不存在'
    }
    res.write(content)
    res.end()
})

server.listen(port)
console.log('监听' + port + '成功\n请打开http://localhost:' + port)