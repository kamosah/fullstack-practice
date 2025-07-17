import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MatrixStatus from '../../MatrixStatus';

import { HeaderContainer } from './styles';

const ChatHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="text.primary">
          Chat
        </Typography>
        <MatrixStatus />
      </Stack>
    </HeaderContainer>
  );
};

export default ChatHeader;
