// server.js
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const axios=require("axios").default;
const express = require('express');
const cors = require('cors'); // 引入 cors
const yahooFinance = require('yahoo-finance2').default;

const app = express();
app.use(cors()); 
app.get('/api/news/index', async (req, res) => {
  try {

    const { data } = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=819bef4949c54bc59625df8c797afcd4"); // 使用你的 API 密鑰


    const headlines = data.articles
    .map(article => ({
      title: article.title,
      url: article.url,
      imageUrl: article.urlToImage || null, // 如果沒有圖片，則設置為 null
    }))
    .filter(article => article.imageUrl !== null); // 過濾掉圖片為 null 的項目

    res.json(headlines); // 返回爬取的數據

  } catch (error) {
    console.error('發生錯誤:', error); // 輸出錯誤信息到控制台
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});
app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  // 取得當前日期和過去5天的日期
  const currentDate = new Date(); // 當前時間
  const pastDate = new Date(); // 用於計算過去的日期
  pastDate.setDate(currentDate.getDate() - 5); // 往前推5天

  // 將日期轉換為yyyy-mm-dd格式的字符串
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 確保月份是兩位數
    const day = date.getDate().toString().padStart(2, '0'); // 確保日期是兩位數
    return `${year}-${month}-${day}`;
  };

  const period1 = formatDate(pastDate); // 過去5天
  const period2 = formatDate(currentDate); // 當前日期

  try {
    // 獲取即時股票數據
    const quote = await yahooFinance.quote(symbol);

    // 獲取指定時間段內的歷史數據
    const queryOptions = { period1, period2, interval: '1d' }; // 設置時間範圍和資料粒度
    const history = await yahooFinance.chart(symbol, queryOptions);

    res.json({ quote, history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});


const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 定義待辦事項的檔案路徑
const todosFilePath = path.join( __dirname, 'assets', 'todos.json');
app.get('/api/todos', (req, res) => {
  const date = req.query.date;

  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: '伺服器錯誤' });
    
    const todos = JSON.parse(data || '{}');
    const todosForDate = todos[date] || [];
    res.json(todosForDate);
  });
});

// 添加新的代辦事項
app.post('/api/todos', (req, res) => {
  const { date, time, text } = req.body;

  if (!date || !time || !text) {
    return res.status(400).json({ error: '缺少必要的資料（日期、時間、事項名稱）' });
  }

  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: '伺服器錯誤' });
    
    const todos = JSON.parse(data || '{}');
    const newTodo = { id: uuidv4(), date, time, text }; // 用 UUID 生成唯一 ID
    
    if (!todos[date]) {
      todos[date] = [];
    }

    todos[date].push(newTodo);

    fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: '無法保存資料' });
      res.json(newTodo);
    });
  });
});

// 刪除待辦事項
app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: '缺少日期資料' });
  }

  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: '伺服器錯誤' });

    const todos = JSON.parse(data || '{}');
    if (todos[date]) {
      todos[date] = todos[date].filter(todo => todo.id !== todoId);
    }

    fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: '無法保存資料' });
      res.sendStatus(200);
    });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
