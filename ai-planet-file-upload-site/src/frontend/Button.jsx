import styled from 'styled-components';

const StyledButton = styled.button`
  /* width: 15px;
height: 5px; */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;

  /* margin: 10px 20px; */
  /* padding: 10px 15px; */
  border-radius: 10px;
  cursor: pointer;

  background-color: #ffffff;
  padding: 5px 15px 34px 12px;
  max-width: 100%;
  margin: 10px 3.5rem 19px 0;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  //   right: '0',
  //   left: 'auto',
`;

const StyledIcon = styled.img`
  width: 18px;
  height: 18px;
  padding: 1px;
  margin: 0 5px 0 0;
`;

function Button({ children, style = {}, onClick = {} }) {
  return (
    <StyledButton style={style} onClick={onClick}>
      <span>
        <StyledIcon src="/upload-icon.svg" alt="upload" />
      </span>
      <span>{children}</span>
    </StyledButton>
  );
}

export default Button;
