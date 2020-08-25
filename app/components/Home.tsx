import React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import HeaderCommandBar from '../features/music/HeaderCommandBar';
import CSVDataList from '../features/music/CSVDataList';

export default function Home() {
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
        <CSVDataList />
      </ScrollablePane>
    </Fabric>
  );
}
