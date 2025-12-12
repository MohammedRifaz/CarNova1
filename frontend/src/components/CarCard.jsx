import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={car.imageUrl || "https://via.placeholder.com/300x200"}
        alt={car.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{car.title}</h2>
        <p className="text-gray-600">{car.brand} - {car.year}</p>
        <p className="text-green-600 font-semibold">Price: ${car.price}</p>
        <p className="text-gray-500">Mileage: {car.mileage}</p>
        <span className={`inline-block mt-2 px-2 py-1 rounded text-white font-bold ${
          car.status === "Available" ? "bg-green-500" : "bg-red-500"
        }`}>
          {car.status}
        </span>
      </div>
    </div>
  );
};

export default CarCard;
