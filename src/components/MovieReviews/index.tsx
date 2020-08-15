import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { parseISO } from 'date-fns/esm';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ReviewForm from '../ReviewForm';

import { Container, Reviews, Review } from './styles';

interface Review {
  author: string;
  content: string;
  tmdbId?: number;
  id?: number;
  created_at: string;
  formattedCreatedAt?: string;
}

interface Props {
  movieId: string;
}

const MovieReviews: React.FC<Props> = ({ movieId }: Props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function loadReviews(): Promise<void> {
      const reviewsResponse = await api.get<Review[]>(`reviews/${movieId}`);

      const formattedReviews = reviewsResponse.data.map((review) => {
        const r = review;

        if (r.created_at) {
          r.formattedCreatedAt = format(parseISO(r.created_at), 'dd/MM/yyyy');
        }

        return r;
      });

      setReviews(formattedReviews);
    }

    loadReviews();
  }, [movieId]);

  return (
    <Container>
      <h2>Resenhas ({reviews.length}) </h2>

      {reviews?.length === 0 ? (
        <>
          <p>Esse filme ainda não tem resenhas</p>
          {user && <ReviewForm movieId={movieId} />}
        </>
      ) : (
        <>
          {user && <ReviewForm movieId={movieId} />}
          <Reviews>
            {reviews?.map((review) => (
              <Review key={`${review.tmdbId}-${review.id}`}>
                <strong>{review.author} </strong>
                <time> {review.formattedCreatedAt} </time>
                <div>{review.content}</div>
              </Review>
            ))}
          </Reviews>
        </>
      )}
    </Container>
  );
};

export default MovieReviews;
