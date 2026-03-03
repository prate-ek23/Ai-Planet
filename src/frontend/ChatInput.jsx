import styled from 'styled-components';
import { handlePrompt } from './services/promptResponseHandler';
import { useState } from 'react';

const StyledChatInput = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 5px;
  border-radius: 5px;
  height: 3rem;
  width: 90vw;
  background-color: #e4e8ee;
  border-width: 2px;
  margin: auto auto 3rem auto;
  padding: 1px;
  bottom: 0;
  background-color: #f1f1f1;
  background-color: #e4e8ee;
  padding: 8px 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.textarea`
  color: #333;
  resize: none;

  width: 90%;
  font-size: 14px;
  font-weight: 400;
  margin: 5px;
  height: 3rem;
  max-height: fit-content;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 8px;
    resize: none;
  overflow: hidden;
  line-height: 1.4;
  font-family: inherit;
  box-sizing: border-box;
  transition: height 0.2s ease;
`;

function ChatInput({ addUserMessage, addLangchainMessage }) {
  const [input, setInput] = useState('');

  const handleQueryInput = async (query) => {
    console.log('Query:', query);
    setInput(''); 

    if (!query.trim()) {
      console.warn('Empty query, not sending.');
      return;
    }

    // Add user query to chat
    addUserMessage(query);
    handlePrompt(query)
      .then((response) => {
        console.log('Response:', response);

        // Add Langchain response to chat
        addLangchainMessage(response);
      })
      .catch((error) => {
        console.error('Error handling prompt:', error);
      });
  };

  return (
    <StyledChatInput>
      <StyledInput
        type="text"
        placeholder="Ask me something..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}

        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleQueryInput(input);
            setInput('');
          }
        }}
      />
      <span
        onClick={() => {
          handleQueryInput(input);
          setInput('');
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        <img src="/send-icon.svg" alt="send" />
      </span>
    </StyledChatInput>
  );
}

export default ChatInput;
