export const uploadDocument = async function (
  sender,
  receiver,
  name,
  locationOfFile,
  message,
  type,
  compressionType
) {
  try {
    console.log('clicked');

    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/files',
      data: {
        sender,
        receiver,
        name,
        locationOfFile,
        message,
        type,
        compressionType,
      },
    });

    if (result.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/user-files/user');
      }, 1500);
    }
  } catch (err) {
    console.log(err.message.data);
  }
};

export const uploadMessage = async function (sender, receiver, message) {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/messages',
      data: {
        sender,
        receiver,
        message,
      },
    });

    console.log(result);
  } catch (err) {
    console.log(err.message.data);
  }
};
