import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 90vh;
  display: flex;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  padding: 16px;

  > h1 {
    margin-bottom: 24px;
  }

  > form {
    width: 100%;
  }

  > a {
    margin-top: 32px;
    display: block;

    transition: color 0.2s, transform 0.2s;

    &:hover {
      /* #0366d6 */
      color: ${shade(0.2, '#171717')};
      transform: translateY(-2px);
    }
  }
`;