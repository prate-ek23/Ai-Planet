import styled from 'styled-components';

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 4rem;
  width: 70rem;
  background-color: #e4e8ee;
  border-color: #000000;
  border-width: 2px;
  margin: 1.5rem 3.5rem;
  position: fixed;
  /* top: auto; */
  /* left: 10%;
  right: 10%; */
  bottom: 0;
`;

const StyledInput = styled.input`
  background-color: #e4e8ee;
  width: 90%;
  font-size: 14px;
  font-weight: 400;
  margin: 5px;
  padding: 5px;
  border: none;
`;

function SearchBar() {
  return (
    <StyledSearchBar>
      <StyledInput type="text" className="search-bar" placeholder="Search..." />
      <span>
        <img src="/send-icon.svg" alt="send" />
      </span>
    </StyledSearchBar>
  );
}

export default SearchBar;
