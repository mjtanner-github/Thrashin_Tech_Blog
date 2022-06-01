const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("signup.js");
  
  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && password) {
    console.log("signup.js: " + name + " " + password);
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Log them in.
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // Redirect the browser to homepage
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
      // Redirect the browser to homepage
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
