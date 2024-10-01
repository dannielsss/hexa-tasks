import { FaCalendar, FaCloudSun, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { getLabels } from '../../../api/ApiLabels';

import FilterElement from '../FilterElement';
import Label from '../../../types/Label';
import LabelList from '../LabelList';

import styles from './styles.module.scss';

export default function FilterView() {
  const [labels, setLabels] = useState<Label[]>([]);
  const onGetLabels = async () => {
    const labelsData = await getLabels();
    setLabels(labelsData);
  };

  useEffect(() => {
    onGetLabels();
  }, []);

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
