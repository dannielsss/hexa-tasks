import { FaCalendar, FaCloudSun, FaSun } from 'react-icons/fa';
import { useContext } from 'react';

import AppContext from '../../../contexts/AppProvider/AppContext';
import FilterElement from '../FilterElement';
// import Loading from '../../common/Loading';
// import LabelList from '../LabelList';

import styles from './styles.module.scss';

export default function FilterView() {
  const { tasks } = useContext(AppContext);
  // const { labels, tasks, loading } = useContext(AppContext);
  const today = new Date().getDate();

  return (
    <div className={styles.view}>
      <div>
        <FilterElement
          linkTo="?filter=today"
          color="#0FA958"
          name="Today"
          count={
            tasks.filter((task) => new Date(task.deadline).getDate() === today)
              .length
          }
          Icon={FaSun}
        />
        <FilterElement
          linkTo="?filter=tomorrow"
          color="#EEA229"
          name="Tomorrow"
          count={
            tasks.filter(
              (task) => new Date(task.deadline).getDate() === today + 1
            ).length
          }
          Icon={FaCloudSun}
        />
        <FilterElement
          linkTo="?filter=planned"
          color="#4681EF"
          name="Planned"
          count={tasks.length}
          Icon={FaCalendar}
        />
      </div>
      <hr />
      {/* {loading ? <Loading /> : <LabelList labels={labels} />} */}
    </div>
  );
}
