import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;

  > h1.desktop {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 30px 50px;

    > h1.mobile {
      display: none;
    }

    > h1.desktop {
      display: block;
    }
  }

  background: #171717;
  color: #fff;

  /* qual dos dois? */
  /* height: 64px; */
  height: 10vh;
`;

export const SearchBar = styled.div`
  input {
    width: 320px;
    height: 36px;
    border-radius: 10px;
    border: 0;
    padding: 15px;

    ::placeholder {
      color: #fff5;
    }

    color: #fff8;
    background: ${lighten(0.1, '#171717')};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    border: 0;
    background: transparent;
    color: #fff;
  }

  strong {
    display: block;
  }
`;
