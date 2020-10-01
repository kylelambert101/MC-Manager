/* eslint-disable react/require-default-props */
import * as React from 'react';
import {
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  Stack,
  TextField,
  IDialogContentProps,
  Label,
} from 'office-ui-fabric-react';
import CSVDataList from './CSVDataList';
import { getDummySongData } from '../../utils/CSVUtilities';

interface Props {
  /**
   * Whether or not this dialog is visible
   */
  visible: boolean;

  /**
   * Update function to set the visibility of this dialog
   */
  setVisible: (visible: boolean) => void;

  onSubmit: (text: string) => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
}

const AddCSVSongsDialog = (props: Props): React.ReactElement => {
  const { visible, setVisible, onSubmit, onCancel, title, message } = props;

  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: title || '',
    closeButtonAriaLabel: 'Close',
    subText: message,
  };

  const handleSubmit = () => {
    setVisible(false);
    onSubmit('');
  };
  const handleCancel = () => {
    setVisible(false);
    if (typeof onCancel !== 'undefined') {
      onCancel();
    }
  };
  return (
    <Dialog
      hidden={!visible}
      dialogContentProps={dialogContentProps}
      onDismiss={() => setVisible(false)}
      minWidth="80%"
      maxWidth="80%"
    >
      <TextField multiline autoAdjustHeight />
      <h3>Parsed Songs:</h3>
      <CSVDataList
        songs={getDummySongData()}
        onSongChange={(s) => console.log('TBD')}
      />
      <DialogFooter>
        <Stack
          horizontal
          horizontalAlign="center"
          tokens={{ childrenGap: '10px' }}
        >
          <PrimaryButton onClick={handleSubmit} text="Submit" />
          <DefaultButton onClick={handleCancel} text="Cancel" />
        </Stack>
      </DialogFooter>
    </Dialog>
  );
};
export default AddCSVSongsDialog;
