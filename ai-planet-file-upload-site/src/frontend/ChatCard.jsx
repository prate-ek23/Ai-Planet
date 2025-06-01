import styled, { css } from 'styled-components';

const senderType = {
  user: css`
    background-color: #ecebfa;
    color: #3a3a6b;
  `,
  langchain: css`
    background-color: #e6faf0;
    color: #0b7c42;
  `,
};

const StyledChatCard = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;

  padding: 0.7rem;
  border-radius: 16px;
  max-width: 60%;

  margin: 0.5rem;
  gap: 0.5rem;

  /* Smooth appearance on new message */
  transition: all 0.2s ease-in-out;
`;

const StyledMessage = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  width: fit-content;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  height: auto;
  background-color: yellow;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  max-width: 100%;
  margin: 0 0 0 0.2rem;
  align-items: center;
  padding: 0.5rem 1rem;

  ${(props) => senderType[props.sender]}
`;

function ChatCard({ children, key, sender }) {
  return (
    <StyledChatCard
      key={key}
      sender={sender}
      style={{ alignSelf: sender === 'user' ? 'flex-end' : 'flex-start' }}
    >
      {sender === 'user' ? <UserLogo /> : <AiPlanet_SmallLogo />}
      <StyledMessage key={key} sender={sender}>
        <span style={{ whiteSpace: 'pre-line' }}>{children}</span>
      </StyledMessage>
    </StyledChatCard>
  );
}

function UserLogo() {
  return (
    <div>
      <img src="./user-logo.svg" alt="User-logo" width={36} height={36} />
    </div>
  );
}

function AiPlanet_SmallLogo() {
  return (
    <div>
      <img
        src="./ai-planet-small-logo.svg"
        alt="Ai-Planet-Logo"
        width={36}
        height={36}
      />
    </div>
  );
}
export default ChatCard;
