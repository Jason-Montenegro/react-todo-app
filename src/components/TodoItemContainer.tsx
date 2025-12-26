import styles from './TodoItemContainer.module.css'
import { type TodoItem, type TodoItemPriority } from '../interfaces/TodoItem.js'
import { todoItemReducer, TodoItemActionType} from '../hooks/todoItemReducer.js'
import { useReducer, useState } from 'react'

interface TodoItemContainerProps {
  todo: TodoItem;
  handleEraseTodoItem: (todoId: number) => void;
}

export default function TodoItemContainer({ todo, handleEraseTodoItem}:
  TodoItemContainerProps) {
  const [todoItem, dispatch] = useReducer(todoItemReducer, todo);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditButtonToggle() {
    if (todoItem.title !== '' && todoItem.description !== '') {
      setIsEditing(!isEditing);
    }
  }

  return (isEditing) ? (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <input className={styles.titleInput}
          onChange={e => dispatch({
            type: TodoItemActionType.TITLE,
            title: e.target.value,
          })}
          placeholder='Title cannot be empty'
          value={todoItem.title}/>
        <div className={styles.detailModifiersContainer}>
          <span>
            <input className={styles.dateInput} type='date'
              name={`item-date-${todoItem.id}`} id={`item-date-${todoItem.id}`}
              value={todoItem.date.toISOString().split("T")[0]}
              onChange={e => {
                const [year, month, day] = e.target.value.split('-').map(
                  Number);
                console.log(year, month, day)
                dispatch({
                  type: TodoItemActionType.DATE,
                  date: new Date(year, month - 1, day),
                });
              }}/>
          </span>
          <div className={styles.priorityContainer}>
            <label>Priority</label>
            <select name={`item-priority-${todoItem.id}`}
              id={`item-priority-${todoItem.id}`}
              value={todoItem.priority} onChange={e => dispatch({
                type: TodoItemActionType.PRIORITY,
                priority: e.target.value as TodoItemPriority,
              })}>
              <option value='HIGH'>HIGH</option>
              <option value='MODERATE'>MODERATE</option>
              <option value='LOW'>LOW</option>
            </select>
          </div>
          <button className={styles.editButton}
            onClick={handleEditButtonToggle}>
            {isEditing ? 'FINISH' : 'EDIT'}
          </button>
        </div>
      </div>
      <div className={styles.descriptionTextareaContainer}>
        <textarea name={`item-description-${todoItem.id}`}
          id={`item-description-${todoItem.id}`}
          placeholder='Description cannot be empty' value={todoItem.description}
          onChange={e => dispatch({
            type: TodoItemActionType.DESCRIPTION,
            description: e.target.value,
          })}/>
      </div>
      <div className={styles.deleteBtnContainer}>
        <button className={styles.deleteBtn}
          onClick={() => handleEraseTodoItem(todoItem.id)}>
          <img src='trash-bin.svg' alt='Delete todo item'/>
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h1 className={styles.titleDetail}>{todoItem.title}</h1>
        <div className={styles.detailModifiersContainer}>
          <span className={styles.dateDisplay}>
            <strong>
              {`${todoItem.date.getDate()} / ${todoItem.date.getMonth() + 1} / `
              + `${todoItem.date.getFullYear()}`}
            </strong>
          </span>
          <div className={styles.priorityContainer}>
            <label>Priority</label>
            <span>{todoItem.priority}</span>
          </div>
          <button className={styles.editButton}
            onClick={handleEditButtonToggle}>
            {isEditing ? 'FINISH' : 'EDIT'}
          </button>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p>{todoItem.description}</p>
      </div>
    </div>
  );
}
