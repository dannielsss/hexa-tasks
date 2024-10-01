import { BiSolidLabel } from 'react-icons/bi';
import FilterElement from './FilterElement';
import Label from '../../types/Label';

interface Props {
  labels: Label[];
}

export default function LabelList({ labels }: Props) {
  return (
    <div>
      {labels.map((label) => (
        <FilterElement
          linkTo=""
          color={label.color}
          name={label.name}
          count={0} // Solve this bug, I will use the database to solve it
          Icon={BiSolidLabel}
          key={label.id}
        />
      ))}
    </div>
  );
}
