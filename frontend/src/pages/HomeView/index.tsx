import ChatInput from '../../components/Chat/sub-components/ChatInput';
import { ResponsiveChatWidth } from '../../styles/layout';

import { HomeContainer } from './styles';

export const HomeView: React.FC = () => {
  return (
    <HomeContainer
      sx={{
        width: ResponsiveChatWidth,
      }}
    >
      <ChatInput />
    </HomeContainer>
  );
};

export default HomeView;
