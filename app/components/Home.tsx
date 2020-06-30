import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import HeaderCommandBar from './HeaderCommandBar';
import CSVDataList from './CSVDataList';
import { SongData } from '../utils/CSVUtilities';

export default function Home() {
  const [songData, setSongData] = React.useState<SongData[]>([]);
  return (
    // Main Stack
    <Stack>
      {/* Header */}
      <Stack horizontal>
        <HeaderCommandBar
          onLoadSongData={(data: SongData[]) => {
            setSongData(data);
          }}
        />
      </Stack>
      <Stack horizontal style={{ width: '100vw' }}>
        {/* Main Display Panel */}
        <Stack style={{ width: '100vw' }}>
          <CSVDataList songData={songData} />
        </Stack>
      </Stack>
    </Stack>
  );
}
