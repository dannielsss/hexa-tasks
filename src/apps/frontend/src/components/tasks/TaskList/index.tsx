import Task, { TaskStatus } from '../../../types/Task';
import styles from './styles.module.scss';
import TaskComponent from '../Task';

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <div className={styles.tasks}>
      {tasks.map((task) => (
        <TaskComponent
          name={task.name}
          label={task.labels}
          key={task.id}
          isCompleted={task.status == TaskStatus.Completed}
        />
      ))}
    </div>
  );
}
