import React, { useState, useEffect } from 'react';

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
            <div>{review.content}</div>
          </Review>
        ))}
      </Reviews>
    </Container>
  );
};

export default MovieReviews;
