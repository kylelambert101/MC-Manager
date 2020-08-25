import * as React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import { useDispatch } from 'react-redux';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { toast } from 'react-toastify';
import { loadCSVFile, selectFileToLoad } from '../../utils/FileUtilities';
import { SongData } from '../../utils/CSVUtilities';
import { loadDataFromCSV } from './musicSlice';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

const handleOpenClick = async (dispatch: React.Dispatch<any>) => {
  // Open the dialogue
  const filePath = await selectFileToLoad();
  if (typeof filePath === 'undefined') {
    // User cancelled the open dialogue. Take no action
    console.log('No file selected in open dialogue. Abort load process.');
    return;
  }
  // Tell redux to load the file if one was selected
  try {
    dispatch(loadDataFromCSV(filePath));
  } catch (err) {
    toast.error(err.message);
  }
};

const HeaderCommandBar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const items: ICommandBarItemProps[] = [
    {
      key: 'upload',
      text: 'Open CSV',
      iconProps: { iconName: 'Database' },
      // I should connect this to redux and set csv data state in a callback
      onClick: () => {
        handleOpenClick(dispatch);
      },
    },

    {
      key: 'share',
      text: 'Save CSV',
      iconProps: { iconName: 'PromotedDatabase' },
      onClick: () => console.log('Share'),
      disabled: true,
    },
    {
      key: 'newItem',
      text: 'Add Songs',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' }, // MusicNote is another good option
      disabled: true,
    },
    {
      key: 'download',
      text: 'Cancel Changes',
      iconProps: { iconName: 'Cancel' },
      onClick: () => console.log('Download'),
      disabled: true,
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
    </div>
  );
};
export default HeaderCommandBar;
