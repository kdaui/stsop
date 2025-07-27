import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const db = getDatabase();

const postsRef = ref(db, 'posts'); 

const postsDiv = document.getElementById('posts');
const form = document.getElementById('postForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

function addPostElement({name, message}) {
  const postEl = document.createElement('div');
  postEl.classList.add('post');
  postEl.innerHTML = `<strong>${escapeHtml(name)}</strong>: ${escapeHtml(message)}`;
  postsDiv.appendChild(postEl);
  postsDiv.scrollTop = postsDiv.scrollHeight; 
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

onChildAdded(postsRef, (snapshot) => {
  const post = snapshot.val();
  addPostElement(post);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return; 

  push(postsRef, { name, message })
    .then(() => {
      messageInput.value = '';
    })
    .catch(console.error);
});
