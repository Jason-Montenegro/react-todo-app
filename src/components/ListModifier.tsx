import styles from './ListModifier.module.css'

interface ListModifierProps {
  sortingOptions: string[];
  handleClearList: () => void;
  handleSortTodoItems: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ListModifier({sortingOptions, handleClearList,
  handleSortTodoItems}: ListModifierProps) {
  const revisedSortingOptions = sortingOptions.filter(option => option !== '');

  return (
    <div className={styles.container}>
      <div className={styles.sortingOptionsContainer}>
        <h2 className={styles.sortTitle}>Sort by</h2>
        <select onChange={e => handleSortTodoItems(e)}
          className={styles.sortingSelector}
          name="sorting-selector" id="sorting-selector">
          {revisedSortingOptions.map((option) =>
            <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <button className={styles.clearAllButton} onClick={handleClearList}>
        Clear all
      </button>
    </div>
  );
}
