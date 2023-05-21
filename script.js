// Fetch data from API and display in UI
function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = '';
  
        posts.forEach(post => {
          const blogPost = document.createElement('div');
          blogPost.classList.add('blog-post');
          blogPost.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
          `;
          blogList.appendChild(blogPost);
        });
  
        // Add event listeners to delete buttons
        const deleteButtons = document.getElementsByClassName('delete-btn');
        Array.from(deleteButtons).forEach(button => {
          button.addEventListener('click', deletePost);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Add a new blog post
  function addPost(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
  
    const newPost = {
      title: titleInput.value,
      body: contentInput.value,
    };
  
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(() => {
        titleInput.value = '';
        contentInput.value = '';
        fetchPosts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Delete a blog post
  function deletePost() {
    const postId = this.getAttribute('data-id');
  
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        fetchPosts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Event listener for adding a blog post
  const addBlogForm = document.getElementById('add-blog-form');
  addBlogForm.addEventListener('submit', addPost);
  
  // Fetch initial posts
  fetchPosts();
  