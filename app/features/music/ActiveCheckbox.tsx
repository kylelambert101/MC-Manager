import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { useDispatch } from 'react-redux';
import { SongData } from '../../utils/CSVUtilities';
import { toggleActive } from './musicSlice';

interface ActiveCheckboxProps {
  song: SongData;
}

const ActiveCheckbox = (props: ActiveCheckboxProps): React.ReactElement => {
  const { song } = props;
  const dispatch = useDispatch();

  return (
    <Checkbox
      checked={song.active}
      boxSide="end"
      styles={{
        root: {
          marginLeft: '0.75em',
        },
      }}
      onChange={() => {
        dispatch(toggleActive(song));
      }}
    />
  );
};

export default ActiveCheckbox;
