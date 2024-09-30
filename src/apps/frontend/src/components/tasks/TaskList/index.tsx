import ITask, { TaskStatus } from '../../../types/Task';
import styles from './styles.module.scss';
import Task from '../Task';

interface Props {
  tasks: ITask[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <div className={styles.tasks}>
      {tasks.map((task) => (
        <Task
          name={task.name}
          label={task.labels}
          key={task.id}
          isCompleted={task.status == TaskStatus.Completed}
        />
      ))}
    </div>
  );
}
