// src/api.js
export const API_URL = "https://carnova1.onrender.com";

export const fetchCars = async () => {
  const res = await fetch(`${API_URL}/cars`);
  return res.json();
};

export const addCar = async (car) => {
  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const editCar = async (id, car) => {
  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCar = async (id) => {
  const res = await fetch(`${API_URL}/cars/${id}`, { method: "DELETE" });
  return res.json();
};

export const adminLogin = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
