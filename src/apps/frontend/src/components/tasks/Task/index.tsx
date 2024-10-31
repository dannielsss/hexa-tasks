import { FaCalendar, FaSquareCheck, FaXmark } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';
import { RiEditCircleFill } from 'react-icons/ri';
import { useContext } from 'react';
import moment from 'moment';

import { Task, TaskPriorities } from '../../../types/Task';
import { formatLabel } from '../../../utils/format-label';
import { removeTask } from '../../../api/ApiTasks';

import AppContext from '../../../contexts/AppProvider/AppContext';
import styles from './styles.module.scss';

interface Props extends Task {
  isCompleted?: boolean;
}

export default function TaskComponent({
  id,
  name,
  labels,
  priority,
  isCompleted,
  deadline,
}: Props) {
  const { reloadTasks, setLoading } = useContext(AppContext);
  const labelConfig = formatLabel(labels);

  const SquareCheck = () => {
    return isCompleted ? (
      <FaSquareCheck size={20} color="#0FA958" />
    ) : (
      <FaRegSquare size={20} />
    );
  };

  const onRemoveTask = async () => {
    setLoading(true);
    await removeTask(id);
    await reloadTasks();
    setLoading(false);
  };

  return (
    <div className={isCompleted ? styles.taskCompleted : styles.task}>
      <div>
        <div className={styles.content}>
          <SquareCheck />
          <p>{name}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-sm flex items-center gap-1">
            <FaCalendar /> {moment(deadline).format('DD MMMM YYYY')}
          </p>
          {labelConfig && (
            <p style={{ color: labelConfig?.color }}>#{labelConfig?.name}</p>
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <div className="flex gap-2">
          <button onClick={onRemoveTask} className="text-red-400 ">
            <FaXmark size={20} />
          </button>
          <button className="text-[#333333] opacity-50">
            <RiEditCircleFill size={20} />
          </button>
          <div
            className={`text-[0.7em] ${
              priority === TaskPriorities.Low
                ? 'bg-green-600'
                : priority === TaskPriorities.Medium
                ? 'bg-orange-600'
                : TaskPriorities.High
                ? 'bg-red-600'
                : null
            } p-1 rounded-md text-white text-center w-16`}
          >
            {priority}
          </div>
        </div>
      </div>
    </div>
  );
}
