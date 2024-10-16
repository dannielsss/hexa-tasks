import { FormEvent, PropsWithChildren, useContext, useRef } from 'react';
import styles from './styles.module.scss';

import { TaskPriorities } from '../../../types/Task';
import { createTask } from '../../../api/ApiTasks';

import AppContext from '../../../contexts/AppProvider/AppContext';
import RequestError from '../../../errors/RequestError';
import FilterView from '../../filters/FilterView';
import Input from '../Input';

export default function AppLayout({ children }: PropsWithChildren) {
  const { reloadTasks } = useContext(AppContext);
  const refInput = useRef<HTMLInputElement>(null);

  const onHandleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!refInput.current) return;
    const data = new FormData(e.currentTarget);

    try {
      await createTask({
        name: data.get('task_name') as string,
        deadline: '2024-10-16',
        priority: TaskPriorities.Low,
      });
      await reloadTasks();

      refInput.current.value = '';
    } catch (error) {
      if (error instanceof RequestError) {
        console.log(error.dataError);
      }
    }
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <div className={styles.content}>
          <Input onHandleSubmit={onHandleSubmit} refInput={refInput} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
