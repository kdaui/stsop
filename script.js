import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBh61lx7syF5_ZKxK5JJ0zdFcPzwS9TOIg",
  authDomain: "kdaui-posts.firebaseapp.com",
  databaseURL: "https://kdaui-posts-default-rtdb.firebaseio.com",
  projectId: "kdaui-posts",
  storageBucket: "kdaui-posts.appspot.com",
  messagingSenderId: "360404207450",
  appId: "1:360404207450:web:a3a44a6c4a10db1b2d1563"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const postsRef = ref(db, 'posts');

const postForm = document.getElementById('postForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const postsContainer = document.getElementById('posts');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name && message) {
    push(postsRef, {
      name,
      message,
      timestamp: Date.now()
    });

    nameInput.value = '';
    messageInput.value = '';
  }
});

onValue(postsRef, (snapshot) => {
  postsContainer.innerHTML = '';
  const data = snapshot.val();

  if (data) {
    const entries = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
    entries.forEach(entry => {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `<strong>${entry.name}:</strong> ${entry.message}`;
      postsContainer.appendChild(post);
    });
  }
});
