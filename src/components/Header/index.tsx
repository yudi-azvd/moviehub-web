import React from 'react';

import { Container, UserInfo } from './styles';

interface User {
  name: string;
}

const Header: React.FC = () => {
  const authenticated = false;
  const user = {
    name: 'Yudi Yamane',
  } as User;

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

      {/* não fica alinhado na página principal */}
      <UserInfo>
        {authenticated ? (
          <>
            <strong> {user.name} </strong>
            <button type="button">Sair</button>
          </>
        ) : (
          <button type="button">Entrar</button>
        )}
      </UserInfo>
    </Container>
  );
};

export default Header;
