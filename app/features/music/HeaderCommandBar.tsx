import * as React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import { useDispatch, useSelector } from 'react-redux';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import {
  cachedSongsSelector,
  loadDataFromCSV,
  overwriteCachedSongs,
  resetSongsFromCached,
  saveFilePathSelector,
  songsSelector,
} from './musicSlice';
import ConfirmDialog from '../../components/ConfirmDialog';
import { saveCSVFile } from '../../utils/FileUtilities';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

const HeaderCommandBar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const songs = useSelector(songsSelector);
  const cachedSongs = useSelector(cachedSongsSelector);
  const savePath = useSelector(saveFilePathSelector);

  // Local state for tracking whether cancel dialog is open
  const [cancelDialogIsOpen, setCancelDialogIsOpen] = React.useState(false);

  const dataHasChanged = React.useMemo(
    () => JSON.stringify(songs) !== JSON.stringify(cachedSongs),
    [songs, cachedSongs]
  );

  const items: ICommandBarItemProps[] = [
    {
      key: 'upload',
      text: 'Open CSV',
      iconProps: { iconName: 'Database' },
      onClick: () => {
        dispatch(loadDataFromCSV());
      },
    },

    {
      key: 'save',
      text: 'Save CSV',
      iconProps: { iconName: 'PromotedDatabase' },
      onClick: () => {
        saveCSVFile(savePath, songs);
        dispatch(overwriteCachedSongs());
      },
      disabled: !dataHasChanged,
    },
    {
      key: 'newItem',
      text: 'Add Songs',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' }, // MusicNote is another good option
      disabled: true,
    },
    {
      key: 'cancel',
      text: 'Cancel Changes',
      iconProps: { iconName: 'Cancel' },
      onClick: () => {
        setCancelDialogIsOpen(true);
      },
      disabled: !dataHasChanged,
    },
  ];

  const overflowItems: ICommandBarItemProps[] = [
    {
      key: 'move',
      text: 'Move to...',
      onClick: () => console.log('Move to'),
      iconProps: { iconName: 'MoveToFolder' },
      disabled: true,
    },
    {
      key: 'copy',
      text: 'Copy to...',
      onClick: () => console.log('Copy to'),
      iconProps: { iconName: 'Copy' },
      disabled: true,
    },
    {
      key: 'rename',
      text: 'Rename...',
      onClick: () => console.log('Rename'),
      iconProps: { iconName: 'Edit' },
      disabled: true,
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
      disabled: true,
    },
    {
      key: 'info',
      text: 'Info',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => console.log('Info '),
      disabled: true,
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
      <ConfirmDialog
        visible={cancelDialogIsOpen}
        setVisible={setCancelDialogIsOpen}
        message="Are you sure you want to discard all changes?"
        onConfirm={() => {
          dispatch(resetSongsFromCached());
        }}
      />
    </div>
  );
};
export default HeaderCommandBar;
