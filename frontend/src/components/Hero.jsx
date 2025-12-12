import React from "react";

const Hero = ({ onExplore }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/4140.jpg')",
      }}
    >
      <div className="text-center bg-black/50 p-8 rounded-xl backdrop-blur">
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-md">
          Drive Your Dream Car
        </h1>

        <p className="mt-4 text-white text-lg">
          Luxury. Performance. Excellence.
        </p>

        <button
          onClick={onExplore}
          className="mt-6 bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400"
        >
          Explore Inventory
        </button>
      </div>
    </div>
  );
};

export default Hero;
