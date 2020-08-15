import React, { useCallback, useRef, FormEvent } from 'react';

import { useAuth } from '../../hooks/auth';
import Button from '../Button';
import api from '../../services/api';

import { Container } from './styles';

interface Props {
  movieId: string;
}

const ReviewForm: React.FC<Props> = ({ movieId }) => {
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const review = {
        movie_id: movieId,
        author_id: user.id,
        author: user.name,
        content: textareaRef.current?.value,
      };

      await api.post('/reviews', review);
    },
    [movieId, user.id, user.name],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {/* Dá pra enviar nada pro backend */}
        <textarea ref={textareaRef} name="review" cols={30} rows={10} />

        <Button type="submit">Salvar resenha</Button>
      </form>
    </Container>
  );
};

export default ReviewForm;
