import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import HeaderCommandBar from '../features/music/HeaderCommandBar';
import CSVDataList from '../features/music/CSVDataList';

export default function Home() {
  return (
    // Main Stack
    <Stack>
      {/* Header */}
      <Stack horizontal>
        <HeaderCommandBar />
      </Stack>
      <Stack horizontal style={{ width: '100vw' }}>
        {/* Main Display Panel */}
        <Stack style={{ width: '100vw' }}>
          <CSVDataList />
        </Stack>
      </Stack>
    </Stack>
  );
}
