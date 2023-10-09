import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/getFeaturedProducts`
        );

        setFeatured(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFeaturedProducts();
  }, []);

  return (
    <section
      id="featured"
      className="flex flex-col items-center justify-center py-20 text-center md:px-10"
    >
      <span className="text-3xl font-bold">OUR FAVOURITES</span>
      <div className="grid gap-2 my-10 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((prod) => (
          <ProductCard key={prod._id} id={prod._id} image={prod.image} />
        ))}
      </div>
    </section>
  );
};

export default Featured;
