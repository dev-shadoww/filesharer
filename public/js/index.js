import '@babel/polyfill';
import { login, signup } from './auth.js';
import { uploadDocument, uploadMessage } from './upload.js';

// LOGIN
const loginForm = document.querySelector('.form-logIn');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-data').value;
    const password = document.getElementById('password-data').value;

    login(email, password);
  });
}

// SIGNUP

const signupForm = document.querySelector('.form-signUp');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector(
      '.form-signUp__input--username'
    ).value;
    const email = document.querySelector('.form-signUp__input--email').value;
    const password = document.querySelector(
      '.form-signUp__input--password'
    ).value;

    signup(username, email, password);
  });
}

// FORM DOCUMENT/FILE

const fileForm = document.querySelector('.form__document-send');

if (fileForm) {
  fileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sender = document.querySelector('.form__input--sender').value;
    const receiver = document.querySelector('.form__input--receiver').value;
    const name = document.querySelector('.form__input--name').value;
    const locationOfFile = document.querySelector(
      '.form__input--location'
    ).value;
    const message = document.querySelector('.form__input--message-file').value;

    let type = 'png';
    let compressionType = 'zip';

    const types = document.querySelectorAll('.form__file-type');

    types.forEach((el) =>
      el.addEventListener('click', (e) => {
        e.preventDefault();
        type = el.value;
        console.log(type);
      })
    );

    const compressions = document.querySelectorAll('.form__compression-type');

    compressions.forEach((el) =>
      el.addEventListener('click', (e) => {
        e.preventDefault();
        compressionType = el.value;
        console.log(compressionType);
      })
    );

    uploadDocument(
      sender,
      receiver,
      name,
      locationOfFile,
      message,
      type,
      compressionType
    );
  });
}

// FORM MESSAGES

const messageForm = document.querySelector('.form-received');

if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sender = document.querySelector('.form-received__sender').value;
    const receiver = document.querySelector('.form-received__username').value;
    const message = document.querySelector('.form-received__message').value;

    uploadMessage(sender, receiver, message);
  });
}
