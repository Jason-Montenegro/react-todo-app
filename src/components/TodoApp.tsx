import { useState } from 'react'
import styles from './TodoApp.module.css'
import { priorityToNumber, type TodoItem }
  from '../interfaces/TodoItem.ts'
import EmptyTodoListBackground from './EmptyTodoListBackground.tsx'
import ListModifier from './ListModifier.tsx';
import TodoItemContainer from './TodoItemContainer.tsx'
import TodoItemEditor from './TodoItemEditor.tsx'

const sortingOptions: string[] = [
  'Highest priority',
  'Lowest priority',
  'Earliest date',
  'Furthest date',
];

function getSortingPredicate(sortType: string) {
  switch (sortType) {
  case sortingOptions[0]:
    return (a: TodoItem, b: TodoItem) =>
      priorityToNumber(a.priority) - priorityToNumber(b.priority);

  case sortingOptions[1]:
    return (a: TodoItem, b: TodoItem) =>
      priorityToNumber(b.priority) - priorityToNumber(a.priority);

  case sortingOptions[2]:
    return (a: TodoItem, b: TodoItem) => a.date.valueOf() - b.date.valueOf();

  case sortingOptions[3]:
    return (a: TodoItem, b: TodoItem) => b.date.valueOf() - a.date.valueOf();

  default: 
    return (a: TodoItem, b: TodoItem) =>
      priorityToNumber(a.priority) - priorityToNumber(b.priority);
  }
}

export default function TodoApp() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [currentSort, setCurrentSort] = useState<string>(sortingOptions[0]);

  function handleSortTodoItems(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentSort(event.target.value);
    setTodoItems(todoItems.slice().sort(
      getSortingPredicate(event.target.value)));
  }

  function handleEraseTodoItem(todoId: number): void {
    setTodoItems(todoItems.filter(todo => todo.id !== todoId));
  }

  function handleAddTodoItemToList(todoDraft: TodoItem): void {
    setTodoItems([...todoItems, todoDraft].sort(
      getSortingPredicate(currentSort)));
  }

  function handleClearList() {
    setTodoItems([]);
  }

  const todoItemsContainers = (todoItems.length > 0) ? todoItems.map(todo =>
    <TodoItemContainer key={todo.id}
    todo={{title: todo.title, description: todo.description,
    priority: todo.priority, date: todo.date, id: todo.id}}
    handleEraseTodoItem={handleEraseTodoItem} />) : null;

  return (
    <div className={styles.container}>
      <TodoItemEditor handleAddTodoItemToList={handleAddTodoItemToList}
      initialId={0} />
      <div className={styles.todoItemsDashboard}>
        <ListModifier sortingOptions={sortingOptions}
        handleClearList={handleClearList}
        handleSortTodoItems={handleSortTodoItems}/>
        <div className={styles.todoList}>
          {todoItemsContainers}
          {!todoItemsContainers && <EmptyTodoListBackground />}
        </div>
      </div>
    </div>
  );
}
