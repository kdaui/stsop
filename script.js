document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const textarea = document.querySelector("textarea");
  const posts = document.querySelector(".posts");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = textarea.value.trim();
    if (content) {
      const post = document.createElement("div");
      post.className = "post";
      post.textContent = content;
      posts.prepend(post);
      textarea.value = "";
    }
  });
});
