import React from 'react';
import { useSelector } from 'react-redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import Loader from 'react-loader-spinner';
import HeaderCommandBar from '../features/music/HeaderCommandBar';
import CSVDataList from '../features/music/CSVDataList';
import { isLoadingSelector, songsSelector } from '../features/music/musicSlice';

export default function Home(): JSX.Element {
  const isLoading = useSelector(isLoadingSelector);
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
          <HeaderCommandBar />
        </Sticky>
        {isLoading ? (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        ) : (
          <CSVDataList />
        )}
      </ScrollablePane>
    </Fabric>
  );
}
