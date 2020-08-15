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
    color: #0366d6;
    margin-top: 32px;
    display: block;

    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: ${shade(0.2, '#0366d6')};
      transform: translateY(-2px);
    }
  }
`;
