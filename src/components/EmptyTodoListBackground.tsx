import styles from './EmptyTodoListBackground.module.css'

export default function EmptyTodoListBackground() {
  return (
    <div className={styles.container}>
      <img src='src/assets/sleeping-cat.svg'
        alt='Sleeping cat bored due to lack of todos'/>
      <label >No work currently</label>
    </div>);
}
