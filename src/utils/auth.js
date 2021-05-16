//export const BASE_URL = "https://api.pavel-khokhlov.nomoredomains.monster";

export const BASE_URL = "http://localhost:3000";

export const signup = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const signin = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const checkContent = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};
