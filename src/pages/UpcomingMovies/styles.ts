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

  --card-width: 150px;

  /* 12:14 */
  /* https://www.youtube.com/watch?v=qm0IfG1GyZU */
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
`;

export const MovieCard = styled.li`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: content-box;
  flex-basis: auto;

  margin-bottom: 30px;
  position: relative;

  div {
    width: var(--card-width);

    a {
      img {
        border-radius: 10px;
        width: var(--card-width);
        transition: transform 0.1s;

        &:hover {
          transform: scale(1.05);
        }
      }

      h3 {
        display: inline-block;
        margin-top: 22px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .vote-average {
      transform: translate(10px, calc(-56%));
    }
  }
`;
