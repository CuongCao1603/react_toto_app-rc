import { useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import { TodoItem } from "./component/TodoItem";
import { Sidebar } from "./component/Sidebar";
import { FilterPanel } from "./component/FilterPanel";
import { AppContext } from "./context/AppProvider";

function App() {
  // hook useState
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Học bài",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Học võ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
    {
      id: "4",
      name: "Đi chợ",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const {
    selectedCategoryId,
    selectedFilterId,
    setSelectedFilterId,
    activeTodoItemId,
    setActiveTodoItemId,
    showSidebar,
    setShowSidebar,
    searchText,
    setSearchText,
  } = useContext(AppContext);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  // 1 state chỉ tồn tại trên component được khai báo
  const handleCompleteCheckboxChange = (todoId) => {
    // console.log(todoId);
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const inputRef = useRef();

  console.log({ inputRef });

  const handleTodoItemClick = (todoId) => {
    // setShowSidebar(!showSidebar);
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }

      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }

      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deteled":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]); // todoList or selected change -> re-render

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        searchText={searchText}
        setSearchText={setSearchText}
        todoList={todoList}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          className="task-input"
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              console.log(value);
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filteredTodos.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                handleTodoItemClick={handleTodoItemClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            // noi cho react biet da co su thay doi va cap nhap lai value
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
