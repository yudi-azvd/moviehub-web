import React, { useState, useEffect } from 'react';

import { Container } from './styles';
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

      console.log(reviewsResponse.data);
      setReviews(reviewsResponse.data);
    }

    loadReviews();
  }, [movieId]);

  return (
    <Container>
      <h2>Resenhas</h2>

      <ul>
        {reviews?.map((review) => (
          <li key={review.id}> {review.content} </li>
        ))}
      </ul>
    </Container>
  );
};

export default MovieReviews;
