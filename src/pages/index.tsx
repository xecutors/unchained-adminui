import React from 'react';
import { ChatProvider } from '../modules/chat';
import { Copilot } from '../components/copilot';

const HomePage: React.FC = () => {
  return (
    <ChatProvider>
      <Copilot />
    </ChatProvider>
  );
};

export default HomePage;
