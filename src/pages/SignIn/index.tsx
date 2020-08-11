import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../helpers/getValidationErrors';

interface SignInFormData {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/sessions', data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);

        formRef.current?.setErrors(validationErrors);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <h1>Entrar</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="text" />
          <Input label="Senha" name="password" type="password" />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/signin">Ainda não possuo uma conta</Link>
      </Content>
    </Container>
  );
};

export default SignIn;
