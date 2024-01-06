
import marked from 'marked';
import qs from 'qs';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAOrXNWOcB5bNoZTgrlMiZR9lBl6OOJQ4Y';

export async function getBook(id) {
 const { items } = await fetchBooks({
    q: id,
    fields: ["id", "title", "authors", "publishedDate", "description", "image"],
    langRestrict: "fr",
 });

 return items.map(toBook)[0];
}

export async function searchBooks(query) {
 const { items } = await fetchBooks({
    q: query,
    fields: ["id", "title", "authors"],
 });

 return items.map((book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
 }));
}

export async function getBooks(pageSize) {
 const { items } = await fetchBooks({
    q: "football biography",
    fields: ["id", "title", "authors", "publishedDate", "description", "image"],
    sort: ["publishedDate:desc"],
    langRestrict: "fr",
    subject: "Biography & Autobiography / Sports",
    maxResults: 10,
 });

 return items.map(toBook);
}



async function fetchBooks(parameters) {
  const url = `${GOOGLE_BOOKS_API_URL}?${qs.stringify(parameters, {
     encodeValuesOnly: true,
  })}&key=${API_KEY}`;
 
  console.log('fetchBooks: ', url);
 
  const response = await fetch(url);
 
  if (!response.ok) {
     throw new Error(`L'API Google Books retourne ${response.status} pour ${url}`);
  }
 
  const data = await response.json();
 


 
  return data;
 }

function toBook(item) {
 const volumeInfo = item.volumeInfo;

 return {
    id: item.id,
    title: volumeInfo.title,
    description: volumeInfo.description,
    authors: volumeInfo.authors,
    categories: volumeInfo.categories,
    publisher: volumeInfo.publisher,
    publishedDate: new Date(volumeInfo.publishedDate).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : null,
 };
}