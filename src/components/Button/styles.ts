import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #0366d6;
  color: #fff;
  height: 38px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: bold;
  margin-top: 24px;

  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${shade(0.2, '#0366d6')};
    transform: translateY(-2px);
  }
`;
