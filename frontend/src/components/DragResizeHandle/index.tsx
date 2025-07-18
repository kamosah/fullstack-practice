import React from 'react';
import { MdDragHandle } from 'react-icons/md';

import { HandleRoot, HandleBar } from './styles';

export const DragResizeHandle: React.FC = () => (
  <HandleRoot>
    <HandleBar>
      <MdDragHandle size={16} color="white" />
    </HandleBar>
  </HandleRoot>
);

export default DragResizeHandle;
