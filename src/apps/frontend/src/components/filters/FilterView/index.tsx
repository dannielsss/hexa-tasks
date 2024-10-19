import { FaCalendar, FaCloudSun, FaSun } from 'react-icons/fa';

import AppContext from '../../../contexts/AppProvider/AppContext';
import FilterElement from '../FilterElement';
import LabelList from '../LabelList';

import styles from './styles.module.scss';
import { useContext } from 'react';

export default function FilterView() {
  const { labels } = useContext(AppContext);

  return (
    <div className={styles.view}>
      <div>
        <FilterElement
          linkTo="?filter=today"
          color="#0FA958"
          name="Today"
          count={10}
          Icon={FaSun}
        />
        <FilterElement
          linkTo="?filter=tomorrow"
          color="#EEA229"
          name="Tomorrow"
          count={10}
          Icon={FaCloudSun}
        />
        <FilterElement
          linkTo="?filter=planned"
          color="#4681EF"
          name="Planned"
          count={10}
          Icon={FaCalendar}
        />
      </div>
      <hr />
      <LabelList labels={labels} />
    </div>
  );
}
