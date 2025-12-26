import { type TodoItem, TodoItemPriority } from '../interfaces/TodoItem'

export enum TodoItemActionType {
  TITLE,
  DESCRIPTION,
  DATE,
  PRIORITY,
  CLEAR
}

type TodoItemAction =
  | { type: TodoItemActionType.TITLE; title: string }
  | { type: TodoItemActionType.DESCRIPTION; description: string }
  | { type: TodoItemActionType.DATE; date: Date }
  | { type: TodoItemActionType.PRIORITY; priority: TodoItemPriority }
  | { type: TodoItemActionType.CLEAR; nextId: number };

export function todoItemReducer(prevState: TodoItem,
  action: TodoItemAction): TodoItem {
  switch (action.type) {
  case TodoItemActionType.TITLE:
    return {...prevState, title: action.title, };

  case TodoItemActionType.DESCRIPTION:
    return { ...prevState, description: action.description, };

  case TodoItemActionType.DATE:
    return { ...prevState, date: action.date, };

  case TodoItemActionType.PRIORITY:
    return { ...prevState, priority: action.priority, };
  
  case TodoItemActionType.CLEAR:
    return { title: '', description: '', priority: TodoItemPriority.MODERATE,
      date: new Date(), id: action.nextId, };

  default:
    return prevState;
  }
}
