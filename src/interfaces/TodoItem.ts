export enum TodoItemPriority {
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: TodoItemPriority;
}

export function priorityToNumber(item: TodoItemPriority): number {
  switch (item) {
  case TodoItemPriority.HIGH: return 0;
  case TodoItemPriority.MODERATE: return 1;
  case TodoItemPriority.LOW: return 2;
  default: return 0;
  }
}
