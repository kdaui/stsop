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
const terminalOutput = document.querySelector('.terminal-output');

function createPostElement(name, message) {
  const post = document.createElement('div');
  post.className = 'post';

  const header = document.createElement('div');
  header.className = 'post-header';
  
  const nameSpan = document.createElement('span');
  nameSpan.className = 'post-name';
  nameSpan.textContent = name;

  header.appendChild(nameSpan);
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'post-message';
  msgDiv.textContent = message;

  post.appendChild(header);
  post.appendChild(msgDiv);
  
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
  }
});

onChildAdded(postsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const postElement = createPostElement(data.name, data.message);
    postsContainer.appendChild(postElement);
    
  }
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    postForm.dispatchEvent(new Event('submit'));
  }
});
