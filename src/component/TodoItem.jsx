import PropTypes from "prop-types";

export const TodoItem = (props) => {
  console.log(props);
  // function handleClick() {
  //   // alert(props.name);
  // }
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            // dung su kien lan truyen page cua phan tu con
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleCompleteCheckboxChange(props.id);
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>💪</p>}
    </div>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  isImportant: PropTypes.bool,
  isCompleted: PropTypes.bool,
  handleTodoItemClick: PropTypes.func,
  handleCompleteCheckboxChange: PropTypes.func,
};
