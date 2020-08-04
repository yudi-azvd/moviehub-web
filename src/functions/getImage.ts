interface MapSize {
  [key: string]: string;
}

const TMDB_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

const mapSizes = {
  backdrop: '/w1920_and_h800_multi_faces',
  poster: '/w300',
  miniPoster: '/w220_and_h330_face',
} as MapSize;

function getImage(type: string, path: string | undefined): string {
  if (!path) {
    return '';
  }

  return `${TMDB_BASE_IMAGE_URL}${mapSizes[type]}${path}`;
}

export default getImage;
