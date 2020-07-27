import styled from 'styled-components';

export const Container = styled.div`
  /* max-width: 1980px; */
  position: relative;
`;

export const MovieBackdrop = styled.div`
  position: absolute;
  z-index: -99;
  background: #0004;

  img {
    /* transform: translateX(10%); */
    opacity: 0.5;
    width: 100vw;
  }
`;

interface MovieBannerProps {
  backgroundUrl: string | undefined;
}

export const MovieBanner = styled.div<MovieBannerProps>`
  position: relative;
  background: #0004;
  width: 100%;
  height: 90vh;

  color: #fff;

  /* Gradiente muda com a o resize da página. mas a imagem continua no mesmo tamanho */
  background-image: linear-gradient(to right, #444 16.15%, #444a 100%),
    url(${(props) => props.backgroundUrl});
  background-size: contain;

  display: flex;
  align-items: center;
  /* margin: 30px auto; */
  padding: 30px 50px;
`;

export const MoviePoster = styled.div`
  img {
    border-radius: 50px;
  }
`;

export const MovieInfo = styled.div``;
