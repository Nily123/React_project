import React, { useState, useEffect } from "react";
import axios from "axios";
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news/index");
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>出錯了: {error}</p>;

  // 確保至少有 10 則新聞
  const firstArticle = news[0];
  const remainingArticles = news.slice(1, 10); // 取第2到第10則新聞

  return (
    <div className="news_back">
      <h1>今日新聞</h1>
      <div className="news_content">
      {/* 第一則新聞，顯示在最上面 */}
      {firstArticle && (
        <div className="news_0" style={{ backgroundImage: `url(${firstArticle.imageUrl})` }}>
          <a href={firstArticle.url} target="_blank" rel="noopener noreferrer">
            {firstArticle.title}
          </a>
        </div>
      )}

      {/* 剩餘的新聞 3x3 排列 */}
      <div className="news_grid">
        {remainingArticles.map((article, index) => (
          <div key={index} className="news_item" style={{ backgroundImage: `url(${article.imageUrl})` }}>
            
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default News;