import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

export const Container = styled.div`
  padding: 16px;

  h2 {
    color: #333;
  }

  h1 {
    margin-bottom: 16px;
  }
`;

export const FavoriteMoviesList = styled.ul`
  h3 {
    margin-bottom: 8px;
    color: #333;
  }
`;

export const FavoriteMovie = styled.li`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 12px;
  }

  > a {
    position: relative;
    transition: opacity 0.2s;
    margin-left: 8px;

    &:hover,
    &:focus {
      text-decoration: underline;
    }

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      width: 0px;
      background: #000;
      top: calc(50% + 1px);

      transition: width 0.2s ease-out;
    }
  }

  /* Quando botão estiver em hover,
  aplique esse estilo na âncora irmã */
  button:hover ~ a {
    opacity: 0.5;

    &::before {
      width: 100%;
      background: #000;
    }
  }

  button {
    /* margin-right: 8px; */
    background: transparent;
    outline: none;
    border: 0;
    display: flex;
    align-items: center;

    > svg {
      transition: transform 0.2s, fill 0.2s;
      fill: #333;
      width: 24px;
      height: 24px;

      &:hover,
      &:focus {
        transform: translateY(-2px);
        fill: #000;
      }
    }
  }
`;

export const DeleteIcon = styled(MdDelete)``;
