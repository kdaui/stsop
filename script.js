import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, limitToLast, query } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

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
const postsRef = query(ref(db, 'posts'), limitToLast(50));

const postForm = document.getElementById('postForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const postsContainer = document.getElementById('posts');
const mainContainer = document.querySelector('.terminal-main');

function createPostElement(name, message) {
    const post = document.createElement('div');
    post.className = 'post';

    post.innerHTML = `
        <div class="post-avatar">NERV</div>
        <div class="post-content">
            <div class="post-header">
                <span class="post-name">${name}</span>
                <span class="post-handle">@user_${Math.floor(Math.random() * 999)}</span>
            </div>
            <div class="post-message">${message}</div>
        </div>
    `;

    return post;
}

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name && message) {
    push(ref(db, 'posts'), {
      name,
      message,
      timestamp: Date.now()
    });
    messageInput.value = '';
    messageInput.focus();
  }
});

onChildAdded(postsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const postElement = createPostElement(data.name, data.message);
        postsContainer.prepend(postElement);
        
        const feedLayout = document.querySelector('.feed-layout');
    }
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    postForm.dispatchEvent(new Event('submit'));
  }
});