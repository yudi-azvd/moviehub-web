import styled, { css } from 'styled-components';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export const Container = styled.div``;

const iconCSS = css`
  width: 28px;
  height: 28px;

  cursor: pointer;
`;

export const FilledHeartIcon = styled(MdFavorite)`
  ${iconCSS}
`;

export const BorderedHeartIcon = styled(MdFavoriteBorder)`
  ${iconCSS}

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
