import React from 'react';

import { Copilot } from '../../components/copilot';
import { ChatProvider } from '../../modules/chat';

const HomePage: React.FC = () => {
  return (
    <ChatProvider>
      <Copilot />
    </ChatProvider>
  );
};

export default HomePage;
