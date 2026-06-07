import React from "react";


const HeroBanner = () => {
  const handleShopNow = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-[500px] flex items-center justify-center bg-center bg-cover bg-[url('/images/herobanner.jpg')]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Content */}
      <div className="container mx-20 text-right relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to UrbanCart
        </h1>
        <p className="text-lg mb-6">
          Shop amazing products at the best prices!
        </p>
        <button
          onClick={handleShopNow}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
