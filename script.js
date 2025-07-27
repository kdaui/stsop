import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const app = getApp();
const db = getDatabase(app);
const postsRef = ref(db, "posts");

document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && message) {
    push(postsRef, {
      name: name,
      message: message,
      timestamp: Date.now()
    });

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
  }
});

onChildAdded(postsRef, (snapshot) => {
  const data = snapshot.val();
  const postEl = document.createElement("div");
  postEl.classList.add("post");
  postEl.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
  document.getElementById("posts").appendChild(postEl);
});
