import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../helpers/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);
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
        <h1>Cadastrar</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome" name="name" type="text" />
          <Input label="Email" name="email" type="text" />
          <Input label="Senha" name="password" type="password" />

          <Button type="submit">Criar conta</Button>
        </Form>

        <Link to="/signin">Já possuo uma conta</Link>
      </Content>
    </Container>
  );
};

export default SignUp;
