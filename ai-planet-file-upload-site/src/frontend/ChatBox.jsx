import styled from 'styled-components';
import SearchBar from './SearchBar';

import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser.js';
import ActionProvider from '../chatbot/ActionProvider.js';

const MyComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};


const StyledChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: auto;
  width: 100%;
`;

function ChatBox() {
  return (
    <StyledChatBox>
      <MyComponent />
      <SearchBar />
    </StyledChatBox>
  );
}

export default ChatBox;
