import React from 'react';
import { useSelector } from 'react-redux';
import {
  Fabric,
  ProgressIndicator,
  ScrollablePane,
  Sticky,
  StickyPositionType,
} from 'office-ui-fabric-react';
import styles from './Home.css';
import HeaderCommandBar from '../features/music/HeaderCommandBar';
import CSVDataList from '../features/music/CSVDataList';
import {
  isLoadingSelector,
  saveFilePathSelector,
} from '../features/music/musicSlice';

export default function Home(): JSX.Element {
  const isLoading = useSelector(isLoadingSelector);
  const filePath = useSelector(saveFilePathSelector);

  const windowTitle = `MC-Manager${filePath === '' ? '' : ` - ${filePath}`}`;

  return (
    <Fabric className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titlebar}>{windowTitle}</div>
        <HeaderCommandBar />
      </div>
      <div className={styles.main}>
        <ScrollablePane>
          {isLoading ? <ProgressIndicator barHeight={4} /> : <CSVDataList />}
        </ScrollablePane>
      </div>
    </Fabric>
  );
}
