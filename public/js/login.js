let url = "";
console.log("url")
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage page
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, url }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'divtrjryn',
  uploadPreset: 'testing'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
    url = result.info.url
  }
}
)

document.getElementById("upload_widget").addEventListener("click", function (event) {
  myWidget.open();
  event.preventDefault();
}, false);


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  document.getElementById("upload_widget").addEventListener("click", function (event) {
    event.preventDefault();
    myWidget.open();
  }, true);
