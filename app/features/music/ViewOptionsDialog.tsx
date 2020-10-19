/* eslint-disable react/require-default-props */
import {
  Checkbox,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Stack,
} from 'office-ui-fabric-react';
import * as React from 'react';
import { ViewOptions } from './MusicTypes';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (newViewOptions: ViewOptions) => void;
  onCancel?: () => void;
  viewOptions: ViewOptions;
}

const ViewOptionsDialog = (props: Props): React.ReactElement => {
  const { visible, setVisible, onSubmit, onCancel, viewOptions } = props;
  const [pendingViewOptions, setPendingViewOptions] = React.useState(
    viewOptions
  );
  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'View Options',
    closeButtonAriaLabel: 'Close',
    subText: 'Configure options for viewing music collection data',
  };

  const handleSubmit = () => {
    setVisible(false);
    onSubmit(pendingViewOptions);
  };

  const handleCancel = () => {
    setVisible(false);

    if (typeof onCancel !== 'undefined') {
      onCancel();
    }
  };

  const handleFadeInactiveChange = (
    ev?: React.FormEvent<HTMLElement>,
    isChecked?: boolean
  ) => {
    setPendingViewOptions({
      ...pendingViewOptions,
      fadeInactive: !pendingViewOptions.fadeInactive,
    });
  };

  return (
    <Dialog
      hidden={!visible}
      dialogContentProps={dialogContentProps}
      onDismiss={handleCancel}
      minWidth="80%"
      maxWidth="80%"
    >
      <Checkbox
        label="Fade Inactive Song Rows"
        checked={pendingViewOptions.fadeInactive}
        onChange={handleFadeInactiveChange}
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

export default ViewOptionsDialog;
