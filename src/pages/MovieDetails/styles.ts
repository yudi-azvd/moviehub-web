import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  /* max-width: 1980px; */
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
  height: 90vh;
  display: flex;
  align-items: center;
  padding: 30px 50px;
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
`;

export const MoviePoster = styled.div`
  img {
    border-radius: 10px;
  }
`;

export const MovieInfo = styled.div`
  margin-left: 50px;

  .title {
    margin-bottom: 22px;

    h1 {
      font-size: 36px;
    }

    p.genre-runtime {
      opacity: 0.8;
    }
  }

  .vote-average {
    margin-bottom: 24px;
    display: flex;

    .average {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0005;
      border-radius: 50%;
      width: 64px;
      height: 64px;

      big,
      small {
        font-weight: bold;
      }

      big {
        font-size: 28px;
      }
    }

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
