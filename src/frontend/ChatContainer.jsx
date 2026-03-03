import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatCard from './ChatCard';

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  align-self: center;
  justify-self: center;
  justify-content: flex-end;
  flex: 1;
  margin: 5rem 3rem 1rem 3rem;
  padding: 0rem 0 2rem 0;
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 -8px 25px 0 rgba(0, 0, 0, 0.22);
  max-height: 85vh;
  max-width: 100vw;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledChatBox = styled.div`
  display: flex;
  margin: 0.2rem auto 2rem auto;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  align-self: center;
  align-content: center;
  width: 90vw;
  padding: 1rem 3.5rem 1rem 3.5rem;
  margin: 1rem auto 2rem auto;
  gap: 10px;
`;

function ChatContainer() {
  const welcomeMessage = { content: "Welcome to the Ai-Planet assistant. Make sure the 'PDF' is uploaded before asking me queries regarding it!", sender: 'langchain', timestamp: new Date() }
  
  const [chatMessages, setChatMessages] = useState([welcomeMessage]);
  console.log('ChatContainer rendered with messages:', chatMessages.length);

  const bottomRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);



  const addUserMessage = (text) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { content: text, sender: 'user', timestamp: new Date() },
    ]);
  };

  const addLangchainMessage = (text) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { content: text, sender: 'langchain', timestamp: new Date() },
    ]);
  };


  return (
    <StyledChatContainer>
      <StyledChatBox>
        {chatMessages.map((msg) => (
          <ChatCard
            key={`${msg.timestamp}-${Math.random()}`}
            sender={msg.sender}
          >
            {msg.content}
            <div ref={bottomRef} />
          </ChatCard>
        ))}
      </StyledChatBox>
      <ChatInput
        addUserMessage={addUserMessage}
        addLangchainMessage={addLangchainMessage}
      />
    </StyledChatContainer>
  );
}

export default ChatContainer;
