require('dotenv').config();
const apiKey = process.env.API_KEY;

document.addEventListener('DOMContentLoaded', () => {

//const apiKey= 'AIzaSyA9kx5VYI2DRsUWU8y5-ZPg2nJrkRR2NwQ';


console.log(`Hello ${process.env.API_KEY}`)

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const bestSellers = document.getElementById('best-sellers');


searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;
    try {
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        displayBooks(data.items, searchResults);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// Fetch world best sellers
async function fetchBestSellers() {
  const bestSellersUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:bestsellers&key=${apiKey}&maxResults=10`;
  try {
    const response = await fetch(bestSellersUrl);
    if (response.ok) {
      const data = await response.json();
      displayBooks(data.items, bestSellers);
    } else {
      throw new Error('Failed to fetch best sellers');
    }
  } catch (error) {
    console.error(error);
  }
}



// Function to display books
function displayBooks(books, targetElement) {
  targetElement.innerHTML = '';
  books.forEach((book) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
    const rating = book.volumeInfo.averageRating || 'N/A';
    const imageSrc = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
    const bookCard = `
      <div class="book">
        <img src="${imageSrc}" alt="${title}" class="book-image">
        <div class="book-details">
          <h3>${title}</h3>
          <p>Author: ${author}</p>
          <p>Rating: ${rating}</p>
        </div>
      </div>
    `;
    targetElement.innerHTML += bookCard;
  });
}

// Main function
async function main() {
  await fetchBestSellers();
 
}

main();

});
