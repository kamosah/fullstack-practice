import Box from '@mui/material/Box';

import { useFileUpload } from '../hooks/useFileUpload';

import PendingFileItem from './PendingFileItem';

export const PendingFiles = () => {
  const { removeFile, pendingFiles } = useFileUpload();
  return (
    pendingFiles.length > 0 && (
      <Box mb={3}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {pendingFiles.map((file) => (
            <PendingFileItem key={file.id} file={file} onRemove={removeFile} />
          ))}
        </Box>
      </Box>
    )
  );
};

export default PendingFiles;
