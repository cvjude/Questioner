const setMessage = (key, message) => {
    if (window.localStorage) {
      localStorage.setItem(key, message);
    }
  };


const getUserToken = () => localStorage.getItem('token') || null;