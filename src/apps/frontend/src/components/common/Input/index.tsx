import { FaPlus } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function Input() {
  return (
    <div className={styles.input_container}>
      <label htmlFor="custom-input">
        <FaPlus />
      </label>
      <input
        className={styles.input}
        placeholder="Add a task, press [Enter] to save"
        id="custom-input"
      />
    </div>
  );
}
