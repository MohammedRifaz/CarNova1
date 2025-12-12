// Centralized API wrapper
export const API_URL = import.meta.env.VITE_API_URL;

// Cars
export const fetchCars = async () => fetch(`${API_URL}/cars`).then(res => res.json());
export const addCar = async (car) => fetch(`${API_URL}/cars`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(car)
}).then(res => res.json());
export const editCar = async (id, car) => fetch(`${API_URL}/cars/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(car)
}).then(res => res.json());
export const deleteCar = async (id) => fetch(`${API_URL}/cars/${id}`, { method: "DELETE" }).then(res => res.json());

// Admin login
export const adminLogin = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  } catch (err) {
    console.error("Login error:", err.message);
    return { success: false, message: err.message };
  }
};
