import { PropsWithChildren } from 'react';

import FilterView from '../../filters/FilterView';
import styles from './styles.module.scss';

export default function AppContainer({ children }: PropsWithChildren) {
  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <FilterView />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
