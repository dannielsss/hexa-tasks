import { IconType } from 'react-icons';
import styles from './styles.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  color: string;
  name: string;
  count: number;
  linkTo: string;
  Icon: IconType;
}

export default function FilterElement({
  linkTo,
  color,
  name,
  count,
  Icon,
}: Props) {
  const location = useLocation();

  return (
    <NavLink
      to={linkTo}
      className={() =>
        location.search == linkTo ? styles.filterActive : styles.filter
      }
    >
      <p>
        <Icon color={color} size={20} /> {name}
      </p>{' '}
      <span>{count}</span>
    </NavLink>
  );
}
