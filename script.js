document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'db2d09fb2547499486c1905b9185469e'; // Replace with your NewsAPI.org API key
    const countrySelect = document.getElementById('country-select');
    const categorySelect = document.getElementById('category-select');
    const newsContainer = document.getElementById('news-container');

    function fetchNews(country = 'us', category = 'general') {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('News Data:', data);
                displayNews(data.articles);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsContainer.innerHTML = '<p class="text-red-500">Error fetching news data. Please try again later.</p>';
            });
    }

    function displayNews(articles) {
        newsContainer.innerHTML = ''; // Clear previous content

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card bg-white rounded-lg shadow-md overflow-hidden';

            const title = document.createElement('h2');
            title.textContent = article.title;
            title.className = 'text-xl font-semibold p-4';
            card.appendChild(title);

            const description = document.createElement('p');
            description.textContent = article.description || 'No description available.';
            description.className = 'text-gray-700 p-4';
            card.appendChild(description);

            if (article.urlToImage) {
                const img = document.createElement('img');
                img.src = article.urlToImage;
                img.alt = article.title;
                img.className = 'w-full';
                card.appendChild(img);
            }

            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank';
            link.className = 'block text-center bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600';
            card.appendChild(link);

            newsContainer.appendChild(card);
        });
    }

    // Fetch news on page load with default values
    fetchNews(countrySelect.value, categorySelect.value);

    // Event listeners for selecting country and category
    countrySelect.addEventListener('change', () => {
        fetchNews(countrySelect.value, categorySelect.value);
    });

    categorySelect.addEventListener('change', () => {
        fetchNews(countrySelect.value, categorySelect.value);
    });
});
