import styled from 'styled-components';

const StyledFileName = styled.div`
  display: inline-flex;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: #0fa958;

  align-items: center;
  justify-content: center;
  width: fit-content; 
  height: fit-content;

  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background-color: #ffffff;
  padding: 5px;
  margin: 10px;
 
  //   right: '0',
  //   left: 'auto',
`;

function FileName() {
  return (
    <StyledFileName>
      <span>
        <img src="/file-icon.svg" alt="file" />
      </span>
      <span>TEST</span>
    </StyledFileName>
  );
}

export default FileName;
