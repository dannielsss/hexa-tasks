import { TaskStatus, Task } from '../../../types/Task';
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
          id={task.id}
          name={task.name}
          labels={task.labels}
          key={task.id}
          status={task.status}
          created_at={task.created_at}
          deadline={task.deadline}
          priority={task.priority}
          isCompleted={task.status == TaskStatus.Completed}
        />
      ))}
    </div>
  );
}
