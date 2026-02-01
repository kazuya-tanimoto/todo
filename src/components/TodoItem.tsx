import type { Todo } from '../types';
import styles from './TodoItem.module.css';

const PRIORITY_LABEL: Record<string, string> = { high: '高', medium: '中', low: '低' };

function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate + 'T00:00:00') < today;
}

function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  return `${y}/${m}/${d}`;
}

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''} ${overdue ? styles.overdue : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={styles.title}>{todo.title}</span>
      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles[`cat-${todo.category}`]}`}>{todo.category}</span>
        <span className={`${styles.badge} ${styles[`pri-${todo.priority}`]}`}>{PRIORITY_LABEL[todo.priority]}</span>
        {todo.dueDate && (
          <span className={`${styles.badge} ${overdue ? styles.dueBadgeOverdue : styles.dueBadge}`}>
            {overdue && '過期 '}
            {formatDate(todo.dueDate)}
          </span>
        )}
      </div>
      <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)} aria-label="削除">×</button>
    </li>
  );
}
