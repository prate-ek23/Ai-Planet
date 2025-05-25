import styled from 'styled-components';
import Button from './Button';
import FileName from './FileName';
import FileUpload from './FileUpload';

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
  /* color: beige; */
  text-decoration: none;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <Logo />
      
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        {/* <FileName />
        <Button
          style={{
            backgroundColor: '#FFFFFF',
            padding: '15px',
            maxWidth: '100%',
            margin: '19px 3.5rem 19px 0',
            boxShadow: 'none',
            fontWeight: '600',
            //   right: '0',
            //   left: 'auto',
          }}
        >
          Upload File
        </Button> */}

        <FileUpload/>
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
        <img src="/ai-planet.svg" alt="Logo" width={104.93} height={41} />
      </StyledAnchor>
    </div>
  );
}

export default NavBar;
