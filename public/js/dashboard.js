function toggleVisable() {
  let toggleElement = document.getElementById("new_Post_block");
  if (toggleElement.style.display === "none") {
    toggleElement.style.display = "block";
  } else {
    toggleElement.style.display = "none";
  }
}


const dashboardFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#new-post-title').value.trim();
  const text = document.querySelector('#new-post-text').value.trim();
  console.log("dashboard.js title text: " + title + " " + text);

  if (title && text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
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
  .querySelector('.dashboard-form')
  .addEventListener('submit', dashboardFormHandler);