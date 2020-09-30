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
  return (
    <Fabric
      style={{
        display: 'flex',
        width: '100%',
        position: 'absolute',
        top: '0',
        bottom: '0',
      }}
    >
      <ScrollablePane>
        <Sticky stickyPosition={StickyPositionType.Header}>
          <div className={styles.titlebar}>
            {` MC-Manager${filePath === '' ? '' : ` - ${filePath}`}`}
          </div>
          <HeaderCommandBar />
        </Sticky>
        {isLoading ? <ProgressIndicator barHeight={4} /> : <CSVDataList />}
      </ScrollablePane>
    </Fabric>
  );
}
