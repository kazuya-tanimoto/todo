import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
  const { todos, totalCount, addTodo, toggleTodo, deleteTodo, filter, setFilter } = useTodos();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.heading}>TODO</h1>
        <TodoForm onAdd={addTodo} />
        <FilterBar filter={filter} onFilter={setFilter} />
        <p className={styles.count}>
          {todos.length} 件{totalCount !== todos.length ? ` / ${totalCount} 件中` : ''}
        </p>
        <ul className={styles.list}>
          {todos.length === 0 ? (
            <li className={styles.empty}>表示するTODOがありません</li>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
