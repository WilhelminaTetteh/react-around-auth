export const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  // your url will be different, of course
  return (
    fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        // if response returns 201-created, parse the data and return to next handler
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((res) => {
        // return the parsed data to client, this data includes a unique, signed JWT
        console.log(res);
        return res;
      })
      // catch all errors
      .catch((err) => console.log(err))
  );
};

//Authorize User
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // does data have a jwt in it?
      if (data.token) {
        // if so, save it to local storage and return data
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};
//  NOTE  we pass this route the token as a parameter, and use that token in the Authorization header
export const getContent = (token) => {
  return (
    fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // NOTE   received data will include user data, such as email
      .then((data) => {
        return data;
      })
  );
};