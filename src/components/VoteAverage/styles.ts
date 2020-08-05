import styled, { css } from 'styled-components';

interface ContainerProps {
  size: number;
  isPositionAbsolute?: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${(props) =>
    props.isPositionAbsolute
      ? css`
          position: absolute;
        `
      : ''}

  background: #101010;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size}px !important;
  height: ${(props) => props.size}px;
  border-radius: 50%;

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => props.size * 0.25}px;

  big,
  small {
    font-weight: bold;
    color: #fff;
  }

  big {
    font-size: 2em;
  }
`;
