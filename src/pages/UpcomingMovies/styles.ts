import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px 30px;

  h2 {
    margin-bottom: 12px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const MovieCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #0001;
  margin-bottom: 30px;

  & + & {
    margin-left: 20px;
  }

  cursor: pointer;

  h3 {
  }

  img {
    border-radius: 10px;
    width: 150;
    height: auto;
  }
`;
