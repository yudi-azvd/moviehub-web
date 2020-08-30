import React, { useRef, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import getValidationErrors from '../../helpers/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signUpAndSignIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await signUpAndSignIn(data);

        history.push('/profile');

        toast('Conta criada com sucesso', { type: 'success' });
      } catch (error) {
        if (error) {
          toast(error.response?.data?.message, { type: 'error' });
        }

        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [history, signUpAndSignIn],
  );

  return (
    <Container>
      <Content>
        <h1 title="Não precisa ser um email real">Cadastrar</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome" name="name" type="text" />
          <Input
            label="Email"
            name="email"
            type="text"
            data-tip
            data-for="email-tip"
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            data-tip
            data-for="password-tip"
          />

          <ReactTooltip id="email-tip" effect="solid">
            Use um email fictício
          </ReactTooltip>

          <ReactTooltip id="password-tip" effect="solid">
            A senha não precisa ser complicada
          </ReactTooltip>

          <Button type="submit">Criar conta</Button>
        </Form>

        <Link to="/signin">Já possuo uma conta</Link>
      </Content>
    </Container>
  );
};

export default SignUp;
