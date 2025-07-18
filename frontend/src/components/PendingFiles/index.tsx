import { useFileUpload } from '../../hooks/useFileUpload';

import { FileList } from './styles';
import PendingFileItem from './sub-components/PendingFileItem';

export const PendingFiles = () => {
  const { removeFile, pendingFiles } = useFileUpload();
  return (
    pendingFiles.length > 0 && (
      <FileList>
        {pendingFiles.map((file) => (
          <PendingFileItem key={file.id} file={file} onRemove={removeFile} />
        ))}
      </FileList>
    )
  );
};

export default PendingFiles;
