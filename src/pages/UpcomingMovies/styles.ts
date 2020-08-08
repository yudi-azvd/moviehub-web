import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 50px;

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

  & + & {
    margin-left: 27px;
  }

  div {
    width: 152px;

    a {
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
