import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../Button';
import Textarea from '../Textarea';
import getValidationErrors from '../../helpers/getValidationErrors';

import { Container } from './styles';

interface Review {
  author: string;
  content: string;
  tmdbId?: number;
  id?: number;
  created_at?: string;
  formattedCreatedAt?: string;
}

interface ReviewFormData {
  content: string;
}

interface Props {
  movieId: string;
  reviews?: Review[];
  setReviews?: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReviewForm: React.FC<Props> = ({ movieId, reviews, setReviews }) => {
  const [openedForm, setOpenedForm] = useState(false);
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ReviewFormData) => {
      try {
        const schema = Yup.object().shape({
          content: Yup.string()
            .min(10, 'Salve uma resenha com no mínimo 10 caracteres.')
            .required('É obrigatório você escrever alguma coisa.'),
        });

        await schema.validate(data, { abortEarly: false });

        const review = {
          movie_id: movieId,
          author_id: user.id,
          author: user.name,
          content: data.content,
          formattedCreatedAt: format(new Date(), 'dd/MM/yyyy'),
        } as Review;

        await api.post('/reviews', review);

        if (setReviews && reviews) {
          setReviews([review, ...reviews]);
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [movieId, user.id, user.name, reviews, setReviews],
  );

  return (
    <Container>
      {openedForm ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Textarea name="content" />

          <div className="buttons">
            <Button className="save" type="submit">
              Salvar resenha
            </Button>
            <Button onClick={() => setOpenedForm(false)} className="cancel">
              Cancelar
            </Button>
          </div>
        </Form>
      ) : (
        <Button onClick={() => setOpenedForm(true)} className="write">
          Ecrever uma resenha
        </Button>
      )}
    </Container>
  );
};

export default ReviewForm;
