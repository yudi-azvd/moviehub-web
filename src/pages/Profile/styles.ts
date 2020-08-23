import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;

  h2 {
    color: #666;
  }
`;

export const MoviesList = styled.ul`
  margin-top: 22px;

  h3 {
    margin-bottom: 13px;
  }

  li + li {
    margin-top: 12px;

    a {
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
`;
