require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 提供靜態文件（/static 路徑），讓靜態資源能正確加載
app.use('/static', express.static(path.join(__dirname, 'map', 'build', 'static')));

// 根路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// /map 路由，返回前端應用的 index.html
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'map', 'build', 'index.html'));
});

// 啟動服務
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
