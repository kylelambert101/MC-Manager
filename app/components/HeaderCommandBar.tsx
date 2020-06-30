import * as React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { loadCSVFile } from '../utils/FileUtilities';
import { SongData } from '../utils/CSVUtilities';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

type LocalProps = {
  onLoadSongData: (songData: SongData[]) => void;
};

const HeaderCommandBar = (props: LocalProps): React.ReactElement => {
  const { onLoadSongData } = props;
  const items: ICommandBarItemProps[] = [
    {
      key: 'upload',
      text: 'Open CSV',
      iconProps: { iconName: 'Database' },
      // I should connect this to redux and set csv data state in a callback
      onClick: () =>
        loadCSVFile(
          (songData: SongData[]): void => {
            console.log('Song data successfully loaded:');
            onLoadSongData(songData);
          },
          (errorMessage) => alert(`Error:\n${errorMessage}`)
        ),
    },

    {
      key: 'share',
      text: 'Save CSV',
      iconProps: { iconName: 'PromotedDatabase' },
      onClick: () => console.log('Share'),
    },
    {
      key: 'newItem',
      text: 'Add Songs',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' }, // MusicNote is another good option
    },
    {
      key: 'download',
      text: 'Cancel Changes',
      iconProps: { iconName: 'Cancel' },
      onClick: () => console.log('Download'),
    },
  ];

  const overflowItems: ICommandBarItemProps[] = [
    {
      key: 'move',
      text: 'Move to...',
      onClick: () => console.log('Move to'),
      iconProps: { iconName: 'MoveToFolder' },
    },
    {
      key: 'copy',
      text: 'Copy to...',
      onClick: () => console.log('Copy to'),
      iconProps: { iconName: 'Copy' },
    },
    {
      key: 'rename',
      text: 'Rename...',
      onClick: () => console.log('Rename'),
      iconProps: { iconName: 'Edit' },
    },
  ];

  const farItems: ICommandBarItemProps[] = [
    {
      key: 'tile',
      text: 'Grid view',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Grid view',
      iconOnly: true,
      iconProps: { iconName: 'Tiles' },
      onClick: () => console.log('Tiles'),
    },
    {
      key: 'info',
      text: 'Info',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => console.log('Info '),
    },
  ];

  return (
    <div>
      <CommandBar
        style={{ width: '100vw' }}
        items={items}
        overflowItems={overflowItems}
        overflowButtonProps={overflowProps}
        farItems={farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};
export default HeaderCommandBar;
