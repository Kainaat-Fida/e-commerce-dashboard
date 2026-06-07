import React from "react";
import HeroBanner from "../components/HeroBanner";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import ProductList from "../components/ProductList";

const LandingPage = () => {
  return (
    <div>
      <HeroBanner />

      <div
        id="products-section"
        className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* Sidebar Filter + Sort */}
        <aside className="md:col-span-1 space-y-4">
        
          {/* CategoryFilter niche */}
          <CategoryFilter />

          {/* SortDropdown upar */}
          <SortDropdown />
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
