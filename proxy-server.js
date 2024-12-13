const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 提供静态文件服务
app.use(express.static('./frontend')); // 确保路径指向 index.html 所在的目录

// 配置 API 代理
app.use('/v1', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
}));

app.use('/v2', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
}));

// 启动代理服务器
app.listen(5500, () => {
    console.log('代理服务器已启动：http://localhost:5500');
});