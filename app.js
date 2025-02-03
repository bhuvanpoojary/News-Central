function fetchNews(query = '', category = '') {
    const url = `http://127.0.0.1:5000/news?query=${query}&category=${category}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('news');
            newsContainer.innerHTML = '';  // Clear previous results
            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                const title = document.createElement('h2');
                title.textContent = article.title;
                articleDiv.appendChild(title);

                if (article.urlToImage) {
                    const image = document.createElement('img');
                    image.src = article.urlToImage;
                    articleDiv.appendChild(image);
                }

                const description = document.createElement('p');
                description.textContent = article.description;
                articleDiv.appendChild(description);

                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Read more';
                articleDiv.appendChild(link);

                newsContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            const newsContainer = document.getElementById('news');
            newsContainer.innerHTML = '<p>Failed to fetch news. Please try again later.</p>';
        });
}

function searchNews() {
    const query = document.getElementById('search').value;
    fetchNews(query);
}

function fetchNewsByCategory(category) {
    fetchNews('', category);
}

// Fetch the latest news on page load
fetchNews();
