import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import logo from '../assets/logo.png';
import './Login.css';

function Login() {
  const emailRef = useRef({ email: '' });
  const passwordRef = useRef({ password: '' });
  const [enabledButton, setEnabledButton] = useState(false);
  const minCharactersPassword = 6;

  const credentialsSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(minCharactersPassword).required(),
  });

  async function validateSchema() {
    credentialsSchema.isValid(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    ).then((isValid) => setEnabledButton(isValid));
  }

  function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
  }

  return (
    <div className="login-container">
      <form onSubmit={ handleSubmit }>
        <img src={ logo } alt="Logo" />
        <input
          data-testid="email-input"
          type="email"
          placeholder="E-mail"
          ref={ emailRef }
          onChange={ () => validateSchema() }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          ref={ passwordRef }
          onChange={ () => validateSchema() }
        />
        <button disabled={ !enabledButton } type="submit" text="Entrar">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
