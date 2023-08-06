// Import stylesheets
import './style.css';

// Write Javascript code!
const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

//this is the code for localStorage and cookies

const userId = 'u12';
const user = {
  name: 'amit',
  age: '23',
  hobbies: ['sports', 'cooking'],
};
storeBtn.addEventListener('click', () => {
  document.cookie = `uId=${userId}; max-age=360`;
  document.cookie = `user=${JSON.stringify(user)}`;

  sessionStorage.setItem('uId', userId);
  localStorage.setItem('user', JSON.stringify(user));
});
retrieveBtn.addEventListener('click', () => {
  console.log(document.cookie);
  const cookieData = document.cookie.split(';');
  const data = cookieData.map((i) => {
    return i.trim();
  });

  console.log(data[1].split('=')[1]);
  const extractId = sessionStorage.getItem('uId');
  const extractUser = JSON.parse(localStorage.getItem('user'));
  console.log(extractUser);
  if (extractId) {
    console.log('Got the id - ' + extractId);
  } else {
    console.log('couldnt get the Id');
  }
});

//this is the code for IndexDB

let db;

const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');
    productsStore.add({
      id: 'p1',
      title: 'A First Product',
      price: 12.99,
      tags: ['Expensive', 'Luxury'],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log('ERROR!');
};

storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  productsStore.add({
    id: 'p2',
    title: 'A Second Product',
    price: 122.99,
    tags: ['Expensive', 'Luxury'],
  });
});

retrieveBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  const request = productsStore.get('p2');

  request.onsuccess = function () {
    console.log(request.result);
  };
});
