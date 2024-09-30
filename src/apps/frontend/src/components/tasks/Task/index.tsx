import { FaSquareCheck } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';
import styles from './styles.module.scss';
import Label from '../../../types/Label';

interface Props {
  name: string;
  label: string;
  isCompleted?: boolean;
}

export default function Task({ name, label, isCompleted }: Props) {
  const SquareCheck = () => {
    return isCompleted ? (
      <FaSquareCheck size={20} color="#0FA958" />
    ) : (
      <FaRegSquare size={20} />
    );
  };

  // Refactor this portion of the code
  // because it will also be used when we l
  // ist the tags in the navbar.
  const formattedLabel = label && label.split(',')[0].split('-');
  const newLabel: Label = {
    name: formattedLabel && '#' + formattedLabel[0],
    color: formattedLabel && formattedLabel[1],
  };

  return (
    <div className={isCompleted ? styles.taskCompleted : styles.task}>
      <SquareCheck />
      <p>
        {name} <span style={{ color: newLabel.color }}>{newLabel.name}</span>
      </p>
    </div>
  );
}
