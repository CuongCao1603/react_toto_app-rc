 import { useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";

const FILTER_ITEMS = [
  { id: "all", label: "All", iconPath: "./public/inbox.png" },
  { id: "important", label: "Important", iconPath: "./public/flag.png" },
  { id: "completed", label: "Completed", iconPath: "./public/check.png" },
  { id: "deleted", label: "Delete", iconPath: "./public/delete.png" },
];

// destructuring
export const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  searchText,
  setSearchText,
  todoList,
}) => {
  // chuyen array ve object
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }

        return newAcc;
      },
      {
        all: todoList.length,
        important: 0,
        completed: 0,
        deleted: 0,
      }
    );
  }, [todoList]);

  console.log(countByFilterType);

  /*
    {
      'all': 30,
      'important': 12,
      'completed':11,
      'deleted':3
    }
  */
  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className="filter-container">
        {FILTER_ITEMS.map((filterItem) => {
          return (
            <div
              key={filterItem.id}
              className={`filter-item ${
                filterItem.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(filterItem.id)}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} />
                <p>{filterItem.label}</p>
              </div>
              <p>{countByFilterType[filterItem.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};
