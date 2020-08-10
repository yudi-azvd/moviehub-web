import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 90vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  h1 {
    margin-bottom: 24px;
  }

  form {
    width: 340px;
  }

  > a {
    margin-top: 32px;
    display: block;

    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: ${shade(0.2, '#171717')};
      transform: translateY(-2px);
    }
  }
`;
