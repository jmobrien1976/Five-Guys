const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };


const signupFormHandler = async (event) => {
    event.preventDefault();

    //TO DO: THESE NEED TO CHANGE TO REFERENCE THE ACTUAL ITEMS ON THE PAGE.
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log in.');
        }
      } else {
        alert('Failed to sign up.');
      }
    }
  };

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

// Function to display signup info while hiding login info.
function displaySignupForm() {
  
  let loginFormEl = document.querySelector('#login');
  loginFormEl.style.display = 'none';
  
  let registerEl = document.querySelector('#register')
  registerEl.style.display = 'none';
  
  let signupFormEl = document.querySelector('#signup');
  signupFormEl.style.display = 'block'
  return;
}

// listen for a click on the 'here' in the 'click here to signup'
document
  .querySelector('#showSignup') 
  .addEventListener('click', displaySignupForm);