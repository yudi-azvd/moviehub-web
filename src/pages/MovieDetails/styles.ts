import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export const Container = styled.div`
  position: relative;
`;

interface MovieBannerProps {
  backgroundUrl: string | undefined;
}

export const MovieBanner = styled.div<MovieBannerProps>`
  position: relative;
  width: 100%;
  /* se vh diminuir, vai ficar sobrando espaço à esquerda.
  Se estiver num daqueles monitores gigantes, vai faltar imagem. */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #212121;
  color: #fff;

  /* ajuste vertical */
  background-size: auto 100%;
  /* Gradiente muda com o resize da página. mas a imagem continua no mesmo tamanho */
  background-image: linear-gradient(
      to right,
      #212121 16.15%,
      ${transparentize(0.2, '#212121')} 100%
    ),
    url(${(props) => props.backgroundUrl});
  background-position: left 150px bottom 0;
  /* https://css-tricks.com/positioning-offset-background-images/ */
  background-repeat: no-repeat;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 90vh;
  }
`;

export const MoviePoster = styled.div`
  img {
    border-radius: 10px;
    width: 150px;
    margin-bottom: 22px;

    @media (min-width: 768px) {
      width: auto;
    }
  }
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    display: block;
    margin-left: 50px;
  }

  .title {
    margin-bottom: 22px;

    .header {
      display: flex;
      align-items: center;

      /* > svg {
        trans
      } */

      h1 {
        font-size: 36px;
        margin-left: 16px;
      }
    }

    p.genre-runtime {
      opacity: 0.8;

      span.runtime {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: calc(50% - 3px);
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fff;
          opacity: 0.8;
        }
      }

      span + span {
        position: relative;
        margin-left: 12px;

        &::before {
          content: '';
          top: calc(50% - 8px);
          left: -8px;
          position: absolute;
          width: 1.5px;
          height: 16px;
          background: #fff;
          opacity: 0.8;
        }
      }
    }
  }

  .vote-average {
    margin-bottom: 24px;
    display: flex;

    p {
      width: 32px;
      margin-left: 10px;
      font-weight: bold;
    }
  }

  em.tagline {
    display: block;
    opacity: 0.6;
  }

  strong {
    display: block;
    margin: 10px 0 8px;
    font-size: 22px;
  }

  section {
    margin-bottom: 16px;
    font-size: 16px;
  }
`;

const iconCSS = css`
  width: 28px;
  height: 28px;

  cursor: pointer;
`;

export const FavoriteIcon = styled(MdFavorite)`
  ${iconCSS}
`;

export const NotFavoriteIcon = styled(MdFavoriteBorder)`
  ${iconCSS}

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
