import styles from './styles.module.scss';

import FilterView from '../../filters/FilterView';
import Input from '../Input';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <div className={styles.content}>
          <Input />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
