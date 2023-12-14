import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsForm from "../components/NewsEditor";

export default function ManageNewsPage() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news");
      const data = await response.json();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNews(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchOptions = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const handleOpenCreateForm = () => {
    setCreateFormOpen(true);
    setEditFormOpen(false);
    setSelectedNews(null);
  };

  const handleCloseCreateForm = () => {
    setCreateFormOpen(false);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
    handleCancelEditNews();
  };

  const handleEditNews = (news) => {
    setSelectedNews(news);
  };

  const handleCancelEditNews = () => {
    setSelectedNews(null);
  };

  const handleCancelCreateNews = () => {
    setSelectedNews(null);
  };

  const handleDeleteNews = async (news) => {
    const confirmDelete = window.confirm(`Er du sikker på du vil slette ${news.headline}?`);
    if (confirmDelete) {
      const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news/${news.news_id}`;
      const method = "DELETE";

      try {
        const response = await fetch(url, {
          method,
        });

        if (response.ok) {
          console.log("News deleted successfully");
          fetchNews();
        } else {
          console.error("An error occurred:", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleSaveNews = async (formData) => {
    const url = selectedNews
      ? `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news/${selectedNews.news_id}`
      : "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news";

    const method = selectedNews ? "PUT" : "POST";

    try {
      const response = await fetch(
        url,
        fetchOptions(method, {
          author_id: 1,
          headline: formData.headline,
          content: formData.content,
        })
      );

      if (response.ok) {
        console.log("News updated successfully");
        handleCloseCreateForm();
        fetchNews();
        setSelectedNews(null);
      } else {
        console.error("An error occurred:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div id="authorForm" className="container mt-5">
      <h1>Administrer nyheder</h1>
      <div>
        <button onClick={handleOpenCreateForm}>Opret nyhed</button>
        <ul className="list-group">
          {news.map((news) => (
            <li key={news.news_id} className="list-group-item">
              <h2>{news.headline}</h2>
              <p>{news.content}</p>
              <button className="btn btn-info button-margin-right" onClick={() => handleEditNews(news)}>
                {" "}
                Rediger nyhed{" "}
              </button>
              <button onClick={() => handleDeleteNews(news)}> Slet nyhed </button>
            </li>
          ))}
        </ul>
        {selectedNews && <NewsForm news={selectedNews} saveNews={handleSaveNews} onCancelEdit={handleCancelEditNews} />}
      </div>
      <div>
        {isCreateFormOpen && (
          <NewsForm
            saveNews={handleSaveNews}
            onCancelCreate={() => {
              handleCloseCreateForm();
              handleCancelCreateNews();
            }}
            news={selectedNews}
          />
        )}
        {isEditFormOpen && (
          <NewsForm
            saveNews={handleSaveNews}
            onCancelEdit={() => {
              handleCloseEditForm();
              handleCancelEditNews();
            }}
            news={selectedNews}
          />
        )}
      </div>
    </div>
  );
}
