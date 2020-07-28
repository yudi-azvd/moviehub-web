import styled from 'styled-components';

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
  height: 90vh;

  background: #0004;
  color: #fff;

  /* Gradiente muda com o resize da página. mas a imagem continua no mesmo tamanho */
  background-image: linear-gradient(to right, #444 16.15%, #444a 100%),
    url(${(props) => props.backgroundUrl});
  /* ajuste vertical */
  background-size: auto 100%;

  display: flex;
  align-items: center;
  padding: 30px 50px;
`;

export const MoviePoster = styled.div`
  img {
    border-radius: 10px;
  }
`;

export const MovieInfo = styled.div`
  margin-left: 50px;

  h1 {
    margin-bottom: 30px;
  }

  strong {
    display: block;
    margin-bottom: 5px;
  }
`;
