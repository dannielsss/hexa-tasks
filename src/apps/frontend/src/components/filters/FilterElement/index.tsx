import { IconType } from 'react-icons';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  color: string;
  name: string;
  count: number;
  linkTo: string;
  Icon: IconType;
}

export default function FilterElement({ linkTo, color, name, count, Icon }: Props) {
  return (
    <NavLink to={linkTo} className={({isActive}) => isActive ? styles.filterActive : styles.filter}>
      <p><Icon color={color} size={20} /> {name}</p> <span>{count}</span>
    </NavLink>
  )
}

