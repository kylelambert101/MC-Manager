import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { useDispatch } from 'react-redux';
import { SongData } from '../../utils/CSVUtilities';
import { toggleInclude } from './musicSlice';

interface IncludeCheckboxProps {
  song: SongData;
}

const IncludeCheckbox = (props: IncludeCheckboxProps): React.ReactElement => {
  const { song } = props;
  const dispatch = useDispatch();

  return (
    <Checkbox
      checked={song.include}
      boxSide="end"
      styles={{
        root: {
          marginLeft: '0.75em',
        },
      }}
      onChange={() => {
        dispatch(toggleInclude(song));
      }}
    />
  );
};

export default IncludeCheckbox;
