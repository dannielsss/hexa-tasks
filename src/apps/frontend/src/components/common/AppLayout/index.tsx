import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { BiCalendar } from 'react-icons/bi';
import moment from 'moment';
import {
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './styles.module.scss';

import { MenuElements } from '../../../types/SelectMenu';
import { TaskPriorities } from '../../../types/Task';
import { createTask } from '../../../api/ApiTasks';
import { PRIORITIES } from '../../../constants';
import Label from '../../../types/Label';

import AppContext from '../../../contexts/AppProvider/AppContext';
import RequestError from '../../../errors/RequestError';
import FilterView from '../../filters/FilterView';
import SelectMenu from '../SelectMenu';
import Input from '../Input';

export default function AppLayout({ children }: PropsWithChildren) {
  const { reloadTasks, labels } = useContext(AppContext);

  const [isCloseCalendar, setIsCloseCalendar] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<Date>();

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
        deadline: moment(selectedDay).format('YYYY-MM-DD'),
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

  const defaultClassNames = getDefaultClassNames();
  const dayPickerContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!dayPickerContainerRef.current) return;
    if (dayPickerContainerRef.current.contains(event.target as Node)) return;

    setIsCloseCalendar(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <div className={styles.content}>
          <header className="flex flex-col gap-1.5 xl:flex-row">
            <Input onHandleSubmit={onHandleSubmit} refInput={refInput} />
            <div className="flex flex-col sm:flex-row gap-1.5">
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
              <div
                className="w-full sm:w-auto relative h-full"
                ref={dayPickerContainerRef}
              >
                <p
                  onClick={() => setIsCloseCalendar(!isCloseCalendar)}
                  className="w-full sm:w-44 h-full flex items-center justify-start sm:justify-center gap-2 border-2 bg-white text-sm rounded-md py-1.5 pl-3 pr-10 select-none mb-2"
                >
                  <BiCalendar />
                  {selectedDay
                    ? moment(selectedDay).format('YYYY/MM/DD')
                    : 'Pick deadline'}
                </p>
                {isCloseCalendar ? null : (
                  <>
                    <div className="bg-white w-3 h-10 absolute top-10 right-12"></div>
                    <div className="bg-white w-3 h-10 absolute top-10 right-4"></div>
                  </>
                )}
                <div className="relative">
                  <DayPicker
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    onDayClick={() => setIsCloseCalendar(!isCloseCalendar)}
                    classNames={{
                      root: `${
                        defaultClassNames.root
                      } absolute right-0 bg-white p-8 rounded-md shadow-lg ${
                        isCloseCalendar ? 'hidden' : 'block'
                      }`,
                      today: `bg-[#4681ef] text-white rounded-md`,
                      selected: `bg-[#e7e7e7] rounded-md`,
                    }}
                  />
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
