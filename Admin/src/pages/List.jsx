import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/food");
      if (data.success) {
        setList(data.food_list);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching data.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/food/${id}`);
      if (data.success) {
        toast.success("Food deleted successfully.");
        fetchList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting food item.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    fetchList();
  }, [handleDelete]);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-sm rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Food Lists</h2>

      {/* Header Row */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] bg-orange-50 font-semibold text-gray-600 text-sm uppercase tracking-wide py-4 px-4 border border-orange-200 rounded-t-lg text-center">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {/* Data Rows */}
      {list.map((food) => (
        <div
          key={food._id}
          className="grid grid-cols-[0.5fr__2fr_1fr_1fr_0.5fr] items-center text-center py-4 px-4 border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
        >
          <img
            src={food.image}
            alt={food.name}
            className="w-14 h-14 object-cover rounded-lg mx-auto shadow-sm"
          />
          <p className="text-gray-800 font-medium">{food.name}</p>
          <p className="text-gray-600 capitalize">{food.category}</p>
          <p className="text-gray-800 font-medium">₹ {food.price}</p>
          <button
            onClick={() => handleDelete(food._id)}
            className="text-red-500 font-medium hover:text-red-600 hover:underline transition-colors duration-150"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
