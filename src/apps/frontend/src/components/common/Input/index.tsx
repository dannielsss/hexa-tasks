import { UseFormRegister } from 'react-hook-form';

import { InputTaskSchema } from '../../../types/Task';
import { FaPlus } from 'react-icons/fa';
import styles from './styles.module.scss';

interface Props {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<InputTaskSchema>;
}

export default function Input({ handleSubmit, register }: Props) {
  return (
    <form className={styles.input_container} onSubmit={handleSubmit}>
      <label htmlFor="custom-input" className={styles.input_label}>
        <FaPlus />
      </label>
      <input
        {...register('name')}
        type="text"
        className={styles.input + ' text-base sm:text-lg'}
        placeholder="Add a task, press [Enter] to save"
        id="custom-input"
      />
    </form>
  );
}
