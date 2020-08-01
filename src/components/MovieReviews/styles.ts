import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px 50px;

  h2 {
    margin-bottom: 8px;
  }
`;

export const Reviews = styled.ul`
  width: 50%;
`;

export const Review = styled.li`
  margin-bottom: 30px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #ddd;

  strong {
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
  }
`;
