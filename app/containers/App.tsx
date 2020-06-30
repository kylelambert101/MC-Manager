import React, { ReactNode } from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

// See https://github.com/microsoft/fluentui/wiki/Using-icons
initializeIcons(/* optional base url */);

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return <>{children}</>;
}
