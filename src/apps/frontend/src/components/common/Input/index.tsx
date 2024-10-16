import { FaPlus } from 'react-icons/fa';
import styles from './styles.module.scss';
import { FormEvent, RefObject } from 'react';

interface Props {
  onHandleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  refInput?: RefObject<HTMLInputElement>;
}

export default function Input({ onHandleSubmit, refInput }: Props) {
  return (
    <form className={styles.input_container} onSubmit={onHandleSubmit}>
      <label htmlFor="custom-input">
        <FaPlus />
      </label>
      <input
        type="text"
        className={styles.input}
        placeholder="Add a task, press [Enter] to save"
        id="custom-input"
        name="task_name"
        ref={refInput}
      />
    </form>
  );
}
