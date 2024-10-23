require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 提供靜態文件
app.use('/map', express.static(path.join(__dirname, 'map', 'build')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 新增 /map 路由
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'map', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
