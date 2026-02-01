import { useState, useCallback } from 'react';
import type { Todo, Priority, Category } from '../types';
import { loadTodos, saveTodos } from '../utils/storage';

export interface FilterState {
  category: Category | 'all';
  priority: Priority | 'all';
  status: 'all' | 'active' | 'completed';
}

const initialFilter: FilterState = {
  category: 'all',
  priority: 'all',
  status: 'all',
};

function persist(todos: Todo[]) {
  saveTodos(todos);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<FilterState>(initialFilter);

  const addTodo = useCallback((title: string, priority: Priority, category: Category, dueDate: string | null) => {
    setTodos((prev) => {
      const next = [
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          priority,
          category,
          dueDate,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ];
      persist(next);
      return next;
    });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      persist(next);
      return next;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const next = prev.filter((t) => t.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter.category !== 'all' && todo.category !== filter.category) return false;
    if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;
    if (filter.status === 'active' && todo.completed) return false;
    if (filter.status === 'completed' && !todo.completed) return false;
    return true;
  });

  return {
    todos: filteredTodos,
    totalCount: todos.length,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
  };
}
