import { BiSolidLabel } from 'react-icons/bi';
import { useContext } from 'react';

import AppContext from '../../contexts/AppProvider/AppContext';
import FilterElement from './FilterElement';
import Label from '../../types/Label';

interface Props {
  labels: Label[];
}

export default function LabelList({ labels }: Props) {
  const { tasks } = useContext(AppContext);

  return (
    <div>
      {labels.map((label) => (
        <FilterElement
          linkTo=""
          color={label.color}
          name={label.name}
          count={
            tasks.filter((task) => task.labels?.includes(label.name)).length
          }
          Icon={BiSolidLabel}
          key={label.id}
        />
      ))}
    </div>
  );
}
