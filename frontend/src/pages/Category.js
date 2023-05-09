import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const [pageCount, setPageCount] = useState(0);

  console.log(products);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    setFilteredProducts(
      products?.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    const getProdByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/getproducts/${name}/${pageNumber}`
        );

        setProducts(response.data.products);
        setPageCount(response.data.pages);
      } catch (error) {
        console.log(error);
      }
    };

    getProdByCategory();
  }, [name, pageNumber]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-5">
      <h2 className="text-3xl my-2 font-bold text-center">
        {name.toUpperCase()}
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <select
            onChange={handleFilters}
            name="sizes"
            className="border py-2 px-4 md:px-6 outline-none"
          >
            <option disabled>Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="flex flex-col mt-2 md:mt-0">
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border py-2 px-1 md:px-6 outline-none"
          >
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 mt-5">
        {filteredProducts.length === 0 && (
          <p className="text-2xl text-cyan-500">No items found</p>
        )}
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image}
          />
        ))}
      </div>

      {pageCount > 1 && filteredProducts.length > 0 && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </section>
  );
};

export default Category;
