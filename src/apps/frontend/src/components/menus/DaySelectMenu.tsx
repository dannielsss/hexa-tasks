import moment from 'moment-timezone';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { BiCalendar } from 'react-icons/bi';
import { TIME_ZONE } from '../../constants';

interface Props {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
}

function DayPickerInput({ selected, setSelected }: Props) {
  const defaultClassNames = getDefaultClassNames();
  const dayPickerContainerRef = useRef<HTMLDivElement | null>(null);

  const [isCloseCalendar, setIsCloseCalendar] = useState<boolean>(true);

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
    <div
      className="w-full sm:w-auto relative h-full z-10"
      ref={dayPickerContainerRef}
    >
      <p
        onClick={() => setIsCloseCalendar(!isCloseCalendar)}
        className="w-full sm:w-44 h-full flex items-center justify-start sm:justify-center gap-2 border-2 bg-white text-sm rounded-md py-1.5 pl-3 pr-10 select-none mb-2"
      >
        <BiCalendar />
        {selected
          ? moment(selected).tz(TIME_ZONE).format('DD/MM/YYYY')
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
          selected={moment(selected).tz(TIME_ZONE).toDate()}
          onSelect={setSelected}
          onDayClick={() => setIsCloseCalendar(!isCloseCalendar)}
          timeZone={TIME_ZONE}
          classNames={{
            root: `${
              defaultClassNames.root
            } absolute right-0 bg-white p-8 rounded-md shadow-lg text-base ${
              isCloseCalendar ? 'hidden' : 'block'
            }`,
            today: `bg-[#4681ef] text-white rounded-md`,
            selected: `bg-[#e7e7e7] rounded-md`,
            chevron: `${defaultClassNames.chevron} fill-blue-500`,
            outside: 'opacity-30',
          }}
          showOutsideDays
        />
      </div>
    </div>
  );
}

export default DayPickerInput;
