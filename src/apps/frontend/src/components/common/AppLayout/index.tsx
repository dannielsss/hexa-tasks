import {
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.scss';

import { TaskPriorities } from '../../../types/Task';
import { createTask } from '../../../api/ApiTasks';

import { PRIORITIES } from '../../../constants';
import AppContext from '../../../contexts/AppProvider/AppContext';
import RequestError from '../../../errors/RequestError';
import FilterView from '../../filters/FilterView';
import Input from '../Input';
import SelectMenu from '../SelectMenu';
import { MenuElements } from '../../../types/SelectMenu';
import Label from '../../../types/Label';

export default function AppLayout({ children }: PropsWithChildren) {
  const { reloadTasks, labels } = useContext(AppContext);
  const [prioritySelected, setPrioritySelected] = useState<MenuElements>(
    PRIORITIES[0]
  );

  const [labelSelected, setLabelSelected] = useState<Label>(
    labels[0] ? labels[0] : { id: '0', color: 'gray', name: 'No label' }
  );
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
        priority: prioritySelected.name as TaskPriorities,
        label: labelSelected.id === '0' ? null : labelSelected,
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
          <header>
            <Input onHandleSubmit={onHandleSubmit} refInput={refInput} />
            <div className={styles.menus}>
              <SelectMenu
                menuElements={PRIORITIES}
                selected={prioritySelected}
                setSelected={setPrioritySelected}
              />
              {labels.length > 0 ? (
                <SelectMenu
                  menuElements={labels}
                  selected={labelSelected}
                  setSelected={
                    setLabelSelected as Dispatch<SetStateAction<MenuElements>>
                  }
                />
              ) : null}
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
