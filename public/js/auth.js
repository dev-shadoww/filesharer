import axios from 'axios';

export const login = async function (email, password) {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/login',
      data: {
        email,
        password,
      },
    });

    if (result.data.status === 'success') {
      window.setTimeout(() => {
        const id = result.data.id;
        location.assign(`/user-files/${id}`);
      }, 100);
    }
  } catch (err) {
    console.log(err.message.data);
  }
};

export const signup = async function (username, email, password) {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/signup',
      data: {
        username,
        email,
        password,
      },
    });

    if (result.data.status === 'success') {
      window.setTimeout(() => {
        const id = result.data.id;
        location.assign(`/user-files/${id}`);
      }, 100);
    }
  } catch (err) {
    console.log(err.message.data);
  }
};
