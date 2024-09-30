import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

import FilterView from '../../filters/FilterView';
import Input from '../Input';

export default function AppLayout() {
  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <div className={styles.content}>
          <Input />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
