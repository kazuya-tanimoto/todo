import type { FilterState } from '../hooks/useTodos';
import type { Category, Priority } from '../types';
import styles from './FilterBar.module.css';

const CATEGORIES: (Category | 'all')[] = ['all', '仕事', '個人', '買い物'];
const PRIORITIES: (Priority | 'all')[] = ['all', 'high', 'medium', 'low'];
const PRIORITY_LABEL: Record<string, string> = { all: '全優先度', high: '高', medium: '中', low: '低' };
const CATEGORY_LABEL: Record<string, string> = { all: '全カテゴリ' };
const STATUSES: (FilterState['status'])[] = ['all', 'active', 'completed'];
const STATUS_LABEL: Record<string, string> = { all: '全件', active: '未完了', completed: '完了済み' };

interface Props {
  filter: FilterState;
  onFilter: (f: FilterState) => void;
}

export default function FilterBar({ filter, onFilter }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`${styles.chip} ${filter.category === c ? styles.active : ''}`}
            onClick={() => onFilter({ ...filter, category: c })}
          >
            {CATEGORY_LABEL[c] || c}
          </button>
        ))}
      </div>
      <div className={styles.group}>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            className={`${styles.chip} ${filter.priority === p ? styles.active : ''}`}
            onClick={() => onFilter({ ...filter, priority: p })}
          >
            {PRIORITY_LABEL[p]}
          </button>
        ))}
      </div>
      <div className={styles.group}>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`${styles.chip} ${filter.status === s ? styles.active : ''}`}
            onClick={() => onFilter({ ...filter, status: s })}
          >
            {STATUS_LABEL[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
