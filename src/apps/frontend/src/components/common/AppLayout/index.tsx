import { PropsWithChildren, useContext } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import styles from './styles.module.scss';

import { InputTaskSchema, TaskPriorities } from '../../../types/Task';
import { useTasks } from '../../../hooks/useTasks';
import { useMenus } from '../../../hooks/useMenus';

import PrioritiesSelectMenu from '../../menus/PrioritiesSelectMenu';
import LabelsSelectMenu from '../../menus/LabelsSelectMenu';
import DayPickerInput from '../../menus/DaySelectMenu';

import AppContext from '../../../contexts/AppProvider/AppContext';
import RequestError from '../../../errors/RequestError';
import FilterView from '../../filters/FilterView';
import Loading from '../Loading';
import Input from '../Input';

export default function AppLayout({ children }: PropsWithChildren) {
  const { register, reset, handleSubmit } = useForm<InputTaskSchema>();
  const { loading, setLoading } = useContext(AppContext);

  const { state, setters } = useMenus();
  const { onCreateTask } = useTasks();

  const onSubmit = async (data: InputTaskSchema) => {
    setLoading(true);
    try {
      await onCreateTask({
        name: data.name,
        deadline: moment(state.selectedDay).format('YYYY-MM-DD'),
        priority: state.prioritySelected.name as TaskPriorities,
        label: state.labelSelected.id === '0' ? null : state.labelSelected,
      });

      reset();
      setLoading(false);
    } catch (error) {
      if (error instanceof RequestError) {
        console.log(error.dataError);
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <div className={styles.content}>
          <header className="flex flex-col gap-1.5 xl:flex-row">
            <Input handleSubmit={handleSubmit(onSubmit)} register={register} />
            <div className="flex flex-col sm:flex-row gap-1.5">
              <PrioritiesSelectMenu
                selected={state.prioritySelected}
                setSelected={setters.setPrioritySelected}
              />
              <LabelsSelectMenu
                selected={state.labelSelected}
                setSelected={setters.setLabelSelected}
              />
              <DayPickerInput
                selected={state.selectedDay}
                setSelected={setters.setSelectedDay}
              />
            </div>
          </header>
          <main>{loading ? <Loading /> : children}</main>
        </div>
      </div>
    </div>
  );
}
