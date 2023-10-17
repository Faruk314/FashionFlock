import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { id: 1, text: "SHIRTS", categorie: "tshirt" },
    { id: 2, text: "SHORTS", categorie: "shorts" },
    { id: 3, text: "JEANS", categorie: "jeans" },
    { id: 4, text: "POLO SHIRTS", categorie: "Polo shirts" },
    { id: 5, text: "JACKETS", categorie: "jackets" },
  ];

  return (
    <section
      id="categories"
      className="flex flex-col pt-20 mx-auto space-y-2 text-center text-white max-w-7xl"
    >
      <div className="grid gap-2 md:grid-cols-2">
        {categories.slice(3, 5).map((categorie) => (
          <div
            key={categorie.id}
            className="flex items-center justify-center bg-cyan-600 h-[29rem]"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold sm:text-2xl md:text-3xl">
                {categorie.text}
              </h2>
              <Link to={`/categories/${categorie.categorie}`}>
                <button className="px-6 py-2 text-lg font-bold text-white transition-colors border-2 border-white bg-bg-cyan-600 hover:bg-cyan-500">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 3).map((categorie) => (
          <div
            key={categorie.id}
            className="flex items-center justify-center bg-cyan-600 h-[29rem]"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold sm:text-2xl md:text-3xl">
                {categorie.text}
              </h2>
              <Link to={`/categories/${categorie.categorie}`}>
                <button className="px-6 py-2 text-lg font-bold text-white transition-colors border-2 border-white bg-bg-cyan-600 hover:bg-cyan-500">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
