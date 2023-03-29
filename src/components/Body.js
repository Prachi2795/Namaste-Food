import React, { useState, useEffect } from "react";
import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";
import { Search } from "./Restaurants";
import { products } from "./constants";
import Shimmer from "./Shimmer";

export default function Body() {
  const [newProducts, setProducts] = useState(products);
  const [showShimmer, setShowshimmer] = useState(true);

  useEffect(() => {
    getRestuarants();
  }, []);

  async function getRestuarants() {
    setShowshimmer(true);
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.3164945&lng=78.03219179999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    setProducts(json?.data?.cards[2]?.data?.data?.cards);
    setShowshimmer(false);
    // console.log("api call successful");
    // console.log(newProducts);
    //console.log(json?.data?.cards[2]?.data?.data?.cards);
  }

  function setData(newData) {
    setProducts(newData);
  }

  return showShimmer ? (
    <Shimmer />
  ) : (
    <div className="w-[100wh]">
      <Search products={newProducts} setData={setData} />
      <Restaurants products={newProducts} />
    </div>
  );
}
