import { FaSquareCheck } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';
import { useContext } from 'react';

import { formatLabel } from '../../../utils/format-label';
import { removeTask } from '../../../api/ApiTasks';

import AppContext from '../../../contexts/AppProvider/AppContext';
import styles from './styles.module.scss';

interface Props {
  id: string;
  name: string;
  label: string;
  isCompleted?: boolean;
}

export default function TaskComponent({ id, name, label, isCompleted }: Props) {
  const { reloadTasks } = useContext(AppContext);
  const labelConfig = formatLabel(label);

  const SquareCheck = () => {
    return isCompleted ? (
      <FaSquareCheck size={20} color="#0FA958" />
    ) : (
      <FaRegSquare size={20} />
    );
  };

  const onRemoveTask = async () => {
    await removeTask(id);
    await reloadTasks();
  };

  return (
    <div className={isCompleted ? styles.taskCompleted : styles.task}>
      <SquareCheck />
      <p>
        {name}{' '}
        <span style={{ color: labelConfig?.color }}>{labelConfig?.name}</span>
      </p>
      <button onClick={onRemoveTask}>remove task</button>
    </div>
  );
}
