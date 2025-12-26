import { useReducer, useState } from 'react';
import styles from './TodoItemEditor.module.css'
import { TodoItemPriority, type TodoItem } from '../interfaces/TodoItem'
import { todoItemReducer, TodoItemActionType } from '../hooks/todoItemReducer'

interface TodoItemEditorProps {
  handleAddTodoItemToList: (draft: TodoItem) => void;
  initialId: number;
}

export default function TodoItemEditor(
  { handleAddTodoItemToList, initialId }: TodoItemEditorProps) {
  const [todoDraft, dispatch] = useReducer(todoItemReducer, {title: '',
    priority: TodoItemPriority.MODERATE, description: '', date: new Date(),
    id: initialId,
  });
  const [currentId, setCurrentId] = useState<number>(0);

  function handleAddTodoDraft() {
    if (todoDraft.title !== '' && todoDraft.description !== '') {
      handleAddTodoItemToList(todoDraft);
      const nextId = currentId + 1;
      setCurrentId(currentId + 1);
      dispatch({
        type: TodoItemActionType.CLEAR,
        nextId: nextId,
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.editorTitleContainer}>
        <h1>TODO APP</h1>
      </div>
      <article className={styles.editorContainer}>
        <section className={styles.titleInputContainer}>
          <label htmlFor='title'>Title</label>
          <input id='title' type="text" placeholder={'Title cannot be empty'}
            value={todoDraft.title}
            onChange={e => dispatch({
              type: TodoItemActionType.TITLE,
              title: e.target.value,
            })}/>
        </section>
        <section className={styles.descriptionInputContainer}>
          <label htmlFor='draft-description'>Description</label>
          <textarea name='description' id='description'
            placeholder='Description cannot be empty'
            value={todoDraft.description}
            onChange={e => dispatch({
              type: TodoItemActionType.DESCRIPTION,
              description: e.target.value,
            })}/>
        </section>
        <section className={styles.prioritySelectorContainer}>
          <label htmlFor='priority'>Priority</label>
          <select name='priority' id='priority' value={todoDraft.priority}
            onChange={e => dispatch({
              type: TodoItemActionType.PRIORITY,
              priority: e.target.value as TodoItemPriority,
            })}>
            <option value='HIGH'>HIGH</option>
            <option value='MODERATE'>MODERATE</option>
            <option value='LOW'>LOW</option>
          </select>
        </section>
        <section className={styles.dateSelectorContainer}>
          <label htmlFor='date'>Date</label>
          <input className={styles.dateInput} type='date' name='date' id='date'
            onChange={e => {
              const [year, month, day] =
                e.target.value.split('-').map(Number);
              dispatch({
                type: TodoItemActionType.DATE,
                date: new Date(year, month - 1, day),
              });
            }}/>
        </section>
      </article>
      <button className={styles.addDraftButton} onClick={handleAddTodoDraft}>
        ADD DRAFT
      </button>
    </div>
  );
}
