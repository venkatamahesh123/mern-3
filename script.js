function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email && password) {
    localStorage.setItem('user', JSON.stringify({ email }));
    window.location.href = 'blogs.html';
  } else {
    alert('Enter credentials');
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function addBlog() {
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const image = document.getElementById('image').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return alert('Login required');

  const blog = {
    title,
    desc,
    image,
    user: user.email
  };

  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  blogs.push(blog);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  window.location.href = 'blogs.html';
}

function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  const container = document.getElementById('blogsContainer');
  container.innerHTML = '';

  blogs.forEach(b => {
    container.innerHTML += `
      <div class="blog-card">
        <h3>${b.user}</h3>
        <img src="${b.image}" alt="${b.title}" width="100%" />
        <p><strong>${b.title}</strong></p>
        <p>${b.desc}</p>
      </div>`;
  });
}

function filterMyBlogs() {
  const user = JSON.parse(localStorage.getItem('user'));
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  const container = document.getElementById('blogsContainer');
  container.innerHTML = '';

  blogs.filter(b => b.user === user.email).forEach(b => {
    container.innerHTML += `
      <div class="blog-card">
        <h3>${b.user}</h3>
        <img src="${b.image}" alt="${b.title}" width="100%" />
        <p><strong>${b.title}</strong></p>
        <p>${b.desc}</p>
      </div>`;
  });
}
