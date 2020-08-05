import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px 30px;

  h2 {
    margin-bottom: 12px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const MovieCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 30px;
  position: relative;

  div {
    width: 150px;

    a {
      text-decoration: none;
      color: inherit;

      img {
        border-radius: 10px;
        width: 150px;
        height: auto;
      }

      h3 {
        display: inline-block;
        margin-top: 22px;
      }
    }

    .vote-average {
      transform: translate(10px, calc(-56%));
    }
  }
`;
