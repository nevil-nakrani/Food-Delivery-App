import { useState } from "react";
import ExploreMenu from "../Components/ExploreMenu";
import Header from "../Components/Header";
import FoodDisplay from "../Components/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  );
};

export default Home;
