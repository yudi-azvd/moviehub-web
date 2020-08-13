import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;

  > h1 {
    margin: 22px 0 36px;
    text-align: center;
  }
`;

export const Movies = styled.ul`
  display: grid;
  grid-gap: 1rem;

  /* 12:14 */
  /* https://www.youtube.com/watch?v=qm0IfG1GyZU */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

export const MovieCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 30px;
  position: relative;

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
