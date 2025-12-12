import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    year: "",
    mileage: "",
    price: "",
    imageUrl: "",
    status: "Available"
  });

  // load cars
  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // form helpers
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setFormData({ title: "", brand: "", year: "", mileage: "", price: "", imageUrl: "", status: "Available" });
    setSelectedCar(null);
    setShowAddModal(true);
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setFormData({
      title: car.title || "",
      brand: car.brand || "",
      year: car.year || "",
      mileage: car.mileage || "",
      price: car.price || "",
      imageUrl: car.imageUrl || "",
      status: car.status || "Available"
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (car) => {
    setSelectedCar(car);
    setShowDeleteModal(true);
  };

  // add
  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cars", { ...formData, price: Number(formData.price) });
      setShowAddModal(false);
      fetchCars();
    } catch (err) {
      console.error("Add failed:", err);
      alert("Add failed.");
    }
  };

  // edit
  const handleEditCar = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;
    try {
      await axios.put(`http://localhost:5000/api/cars/${selectedCar.id}`, { ...formData, price: Number(formData.price) });
      setShowEditModal(false);
      setSelectedCar(null);
      fetchCars();
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Edit failed.");
    }
  };

  // delete
  const handleDeleteCar = async () => {
    if (!selectedCar) return;
    try {
      await axios.delete(`http://localhost:5000/api/cars/${selectedCar.id}`);
      setShowDeleteModal(false);
      setSelectedCar(null);
      fetchCars();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Welcome, Admin</h1>
            <div className="flex gap-3">
              <button onClick={openAddModal} className="bg-green-500 px-4 py-2 rounded-full font-semibold hover:bg-green-400 transition">Add Car</button>
              <button onClick={() => { localStorage.removeItem("isAdmin"); window.location.href = "/"; }} className="bg-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition">Logout</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-gray-800 p-4 rounded-2xl">
                <img src={car.imageUrl} alt={car.title} className="w-full h-56 object-cover rounded-xl mb-3" />
                <h2 className="text-xl font-bold">{car.title}</h2>
                <p className="text-gray-300">{car.brand} • {car.year}</p>
                <p className="text-gray-300">Mileage: {car.mileage}</p>
                <p className="text-yellow-400 font-semibold">${Number(car.price).toLocaleString()}</p>
                <p className="text-sm mt-1">{car.status}</p>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEditModal(car)} className="flex-1 bg-blue-500 py-2 rounded-full font-semibold hover:bg-blue-400 transition">Edit</button>
                  <button onClick={() => openDeleteModal(car)} className="flex-1 bg-red-500 py-2 rounded-full font-semibold hover:bg-red-400 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal>
          <CarForm
            title="Add New Car"
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleAddCar}
            onClose={() => setShowAddModal(false)}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal>
          <CarForm
            title="Edit Car"
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleEditCar}
            onClose={() => { setShowEditModal(false); setSelectedCar(null); }}
          />
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal>
          <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Delete Car?</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete <b>{selectedCar?.title}</b>?</p>
            <div className="flex gap-3">
              <button onClick={handleDeleteCar} className="flex-1 bg-red-600 py-3 rounded-full font-semibold hover:bg-red-500 transition">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-600 py-3 rounded-full font-semibold hover:bg-gray-500 transition">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
    {children}
  </div>
);

const CarForm = ({ title, formData, handleChange, onSubmit, onClose }) => (
  <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md">
    <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{title}</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      {["title","brand","year","mileage","price","imageUrl","status"].map((key) => (
        <div key={key}>
          {key === "status" ? (
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-xl bg-gray-700 text-white">
              <option>Available</option>
              <option>Sold</option>
            </select>
          ) : (
            <input
              type={key === "price" || key === "year" ? "number" : "text"}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-700 text-white"
              required
            />
          )}
        </div>
      ))}

      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-green-500 py-3 rounded-full font-semibold hover:bg-green-400 transition">Save</button>
        <button type="button" onClick={onClose} className="flex-1 bg-gray-600 py-3 rounded-full font-semibold hover:bg-gray-500 transition">Cancel</button>
      </div>
    </form>
  </div>
);
