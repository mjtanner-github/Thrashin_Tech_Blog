const commentFormHandler = async (event) => {
  event.preventDefault();

  // Get comment text and post id.
  const text = document.querySelector('#new-comment-text').value.trim();
  const id = document.querySelector('#post_id');
  console.log("dashboard.js title text: " + title + " " + text);

  if (text && id) {
    console.log("comment.js: " + text + " " + id);
  
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ text, id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
    
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
  

  console.log("comment.js");