const HandleLogin = async (username, password, email) => {
  // Prevent form default behavior
  // event.preventDefault();

  try {
      const response = await fetch('https://localhost:3000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              password_hash: password,
              email: email
          })
      });

      const data = await response.json();

      if (response.ok) {
          // Assuming your backend returns a user object upon successful login
          setUser(data.user);
          // If you receive a token, you can store it in local storage or in a cookie for future authenticated requests
          // localStorage.setItem('token', data.token);
      } else {
          // Handle error. Maybe set an error state to show a message to the user
          console.error(data.message); // Assuming the server responds with an error message
      }
  } catch (error) {
      console.error('There was an error logging in', error);
  }
}

export default HandleLogin
