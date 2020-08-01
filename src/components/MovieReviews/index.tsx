import React, { useState, useEffect, useCallback } from 'react';

import { Container, Reviews, Review } from './styles';

import api from '../../services/api';

interface Review {
  author: string;
  content: string;
  id: string;
}

interface Props {
  movieId: string;
}

const MovieReviews: React.FC<Props> = ({ movieId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function loadReviews(): Promise<void> {
      const reviewsResponse = await api.get<Review[]>(`reviews/${movieId}`);

      setReviews(reviewsResponse.data);
    }

    loadReviews();
  }, [movieId]);

  const toggleSeeMore = useCallback((id) => {
    const span = document.getElementById(id);
    const button = document.getElementById(`btn-${id}`);

    if (span?.classList.contains('hide')) {
      span.classList.remove('hide');
      button?.textContent = '...Veja menos';
    } else {
      span.classList.remove('hide');
      button?.innerText = '...Veja mais';
    }
  }, []);

  if (reviews?.length === 0) {
    return (
      <Container>
        <h2>Resenhas</h2>
        <p>Esse filme ainda não tem resenhas</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Resenhas ({reviews.length}) </h2>

      {/* ReviewInput */}

      <Reviews>
        {reviews?.map((review) => (
          <Review key={review.id}>
            <strong>{review.author} </strong>
            <div className="hide-overflow">
              {review.content.slice(0, 300)}
              <span id={`${review.id}-${review.author}`} className="hide">
                {review.content.slice(300, review.content.length)}
              </span>
              <button
                id={`btn-${review.id}-${review.author}`}
                type="button"
                onClick={() => toggleSeeMore(`${review.id}-${review.author}`)}
              >
                ...Veja mais
              </button>
            </div>
          </Review>
        ))}
      </Reviews>
    </Container>
  );
};

export default MovieReviews;
