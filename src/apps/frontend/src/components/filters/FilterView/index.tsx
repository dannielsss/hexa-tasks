import { FaCalendar, FaCloudSun, FaSun } from 'react-icons/fa';
import { BiSolidLabel } from 'react-icons/bi';

import styles from './styles.module.scss';
import FilterElement from '../FilterElement';

export default function FilterView() {
  return (
    <div className={styles.view}>
      <div className={styles.filter_section}>
        <FilterElement
          linkTo="/today"
          color="#0FA958"
          name="Today"
          count={10}
          Icon={FaSun}
        />
        <FilterElement
          linkTo="/tomorrow"
          color="#EEA229"
          name="Tomorrow"
          count={10}
          Icon={FaCloudSun}
        />
        <FilterElement
          linkTo="/"
          color="#4681EF"
          name="Planned"
          count={10}
          Icon={FaCalendar}
        />
      </div>
      <hr />
      <div className={styles.filter_section}>
        <FilterElement
          linkTo="/school"
          color="#A90F71"
          name="School"
          count={10}
          Icon={BiSolidLabel}
        />
        <FilterElement
          linkTo="/study"
          color="#A90F12"
          name="Study"
          count={10}
          Icon={BiSolidLabel}
        />
      </div>
    </div>
  );
}
