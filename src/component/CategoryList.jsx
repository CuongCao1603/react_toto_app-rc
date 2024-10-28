import { useContext } from "react";
import { CATEGORY_ITEMS } from "../constant";
import "./CategoryList.css";
import { AppContext } from "../context/AppProvider";
import PropTypes from "prop-types";

export const CategoryList = ({ todoList }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);
  return (
    <div>
      <p>CategoryList</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <p className="category-name">{category.label}</p>
              <p>2</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  todoList: PropTypes.array,
};
