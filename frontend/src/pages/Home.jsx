import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCars } from "../api";

export default function Home() {
  const carSectionRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadCars = async () => {
      const data = await fetchCars();
      setCars(data);
    };
    loadCars();
  }, []);

  const handleExploreClick = () => carSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleViewMore = () => setVisibleCount(v => v + 6);

  return (
    <>
      <Navbar />
      <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_3t/4140.jpg')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest mb-4 animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-[0_0_12px_rgba(255,255,0,0.7)]">
            Drive Your Dream Car
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">Premium pre-owned cars with style & class</p>
          <button onClick={handleExploreClick} className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition">
            Explore Inventory
          </button>
        </div>
      </div>

      <div ref={carSectionRef} className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Available Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(0, visibleCount).map(car => (
            <div key={car.id} className="bg-gray-800 p-5 rounded-3xl hover:scale-105 transform transition">
              <img src={car.imageUrl} alt={car.title} className="w-full h-64 object-cover rounded-xl mb-3" />
              <h3 className="text-xl font-bold text-white">{car.title}</h3>
              <p className="text-gray-300">{car.brand} • {car.year}</p>
              <p className="text-gray-300">Mileage: {car.mileage}</p>
              <p className="text-yellow-400 font-semibold text-lg mt-2">${Number(car.price).toLocaleString()}</p>
              <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${car.status === "Available" ? "bg-green-500/50 text-green-100" : "bg-red-500/50 text-red-100"}`}>
                {car.status}
              </span>
            </div>
          ))}
        </div>
        {visibleCount < cars.length && (
          <div className="text-center mt-8">
            <button onClick={handleViewMore} className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition">
              View More Cars
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
