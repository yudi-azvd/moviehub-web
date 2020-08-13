import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../helpers/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn(data);

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [signIn, history],
  );

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
