import styled from 'styled-components';
import Button from './Button';
import FileName from './FileName';
import FileUploaderDialogBox from './FileUploaderDialogBox';

const StyledNavBar = styled.div`
  display: flex;
  height: 77px;
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 77px;
  padding: 10px 3.5rem;
  z-index: 1000;
  box-shadow: 0 -8px 25px 0 rgba(0, 0, 0, 0.22);
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const StyledAnchor = styled.a`
  text-decoration: none;
`;



function NavBar({ isUploading, setIsUploading,  setIsParsing }) {
  return (
    <StyledNavBar>
      <Logo />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <FileUploaderDialogBox
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setIsParsing={setIsParsing}
        />
      </div>
    </StyledNavBar>
  );
}

function Logo() {
  return (
    <div>
      <StyledAnchor
        href="https://aiplanet.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/ai-planet.svg"
          alt="Ai-Planet-Logo"
          width={104.93}
          height={41}
        />
      </StyledAnchor>
    </div>
  );
}

export default NavBar;
