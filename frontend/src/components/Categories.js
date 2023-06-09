import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { id: 1, text: "SHIRTS", categorie: "tshirt" },
    { id: 2, text: "JACKETS", categorie: "jackets" },
    { id: 3, text: "JEANS", categorie: "jeans" },
    { id: 4, text: "SHORTS", categorie: "shorts" },
    { id: 5, text: "POLO SHIRTS", categorie: "Polo shirts" },
    { id: 6, text: "VESTS", categorie: "vests" },
  ];

  return (
    <section
      id="categories"
      className="px-1 text-center grid text-white md:grid-cols-2 lg:grid-cols-3 pt-20"
    >
      {categories.map((categorie) => (
        <div
          key={categorie.id}
          className="bg-cyan-600 h-[25rem] mt-2 md:ml-2 flex items-center justify-center md:h-[30rem]"
        >
          <div className="flex flex-col space-y-2">
            <h2 className="sm:text-2xl md:text-3xl font-bold">
              {categorie.text}
            </h2>
            <Link to={`/categories/${categorie.categorie}`}>
              <button className="px-6 py-2 text-lg font-bold text-white transition-colors bg-bg-cyan-600 border-2 border-white hover:bg-cyan-500">
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;
