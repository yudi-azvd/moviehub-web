import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  /* max-width: 1980px; */
  position: relative;
`;

interface MovieBannerProps {
  backgroundUrl: string | undefined;
  color: string;
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
  background: ${(props) => props.color};
  color: #fff;

  /* ajuste vertical */
  background-size: auto 100%;
  /* Gradiente muda com o resize da página. mas a imagem continua no mesmo tamanho */
  background-image: linear-gradient(
      to right,
      ${(props) => props.color} 16.15%,
      ${(props) => transparentize(0.2, props.color)} 100%
    ),
    url(${(props) => props.backgroundUrl});
  background-color: ${(props) => props.color};
  background-position: left 150px bottom 0;
  /* https://css-tricks.com/positioning-offset-background-images/ */
  background-repeat: no-repeat;
`;

export const MoviePoster = styled.div`
  img {
    border-radius: 10px;
    display: none;
  }
`;

export const MovieInfo = styled.div`
  margin-left: 50px;

  h1 {
    font-size: 36px;
  }

  p.tagline {
    opacity: 0.6;
    margin-bottom: 30px;
  }

  strong {
    display: block;
    margin-bottom: 5px;
  }

  section {
    margin-bottom: 16px;
  }

  .rating {
    display: flex;
    align-items: center;

    big,
    small {
      font-weight: bold;
    }
  }
`;
