export type Priority = 'high' | 'medium' | 'low';

export type Category = '仕事' | '個人' | '買い物';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string | null; // ISO date string (YYYY-MM-DD)
  createdAt: string; // ISO timestamp
}
