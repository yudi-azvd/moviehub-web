import React from 'react';
import { Link } from 'react-router-dom';

import { Container, UserInfo } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <h1 className="desktop">
        <a href="/">MOVIEHUB</a>
      </h1>

      <h1 className="mobile">
        <a href="/">M</a>
      </h1>

      {/* <SearchBar>
        <input type="text" placeholder="Procure por filmes..." />
      </SearchBar> */}

      <UserInfo>
        {user ? (
          <>
            <Link to="/profile">
              <strong> {user.name} </strong>
            </Link>
            <button onClick={() => signOut()} type="button">
              Sair
            </button>
          </>
        ) : (
          <Link to="/signin">
            <button type="button">Entrar</button>
          </Link>
        )}
      </UserInfo>
    </Container>
  );
};

export default Header;
