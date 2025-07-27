const textarea = document.getElementById('message');
const postBtn = document.getElementById('post');
const postsDiv = document.getElementById('posts');


const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
savedPosts.forEach(addPost);


postBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (text !== '') {
    const post = { content: text };
    savedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    addPost(post);
    textarea.value = '';
  }
});


function addPost(post) {
  const div = document.createElement('div');
  div.className = 'post';
  div.textContent = post.content;
  postsDiv.prepend(div);
}
