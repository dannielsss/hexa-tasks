import { FaSquareCheck } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';

import { formatLabel } from '../../../utils/format-label';
import styles from './styles.module.scss';

interface Props {
  name: string;
  label: string;
  isCompleted?: boolean;
}

export default function TaskComponent({ name, label, isCompleted }: Props) {
  const labelConfig = formatLabel(label);

  const SquareCheck = () => {
    return isCompleted ? (
      <FaSquareCheck size={20} color="#0FA958" />
    ) : (
      <FaRegSquare size={20} />
    );
  };

  return (
    <div className={isCompleted ? styles.taskCompleted : styles.task}>
      <SquareCheck />
      <p>
        {name}{' '}
        <span style={{ color: labelConfig?.color }}>{labelConfig?.name}</span>
      </p>
    </div>
  );
}
