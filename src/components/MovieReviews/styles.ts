import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;

  h2 {
    margin-bottom: 8px;
  }
`;

export const Reviews = styled.ul`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Review = styled.li`
  margin-bottom: 30px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  strong {
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
  }

  div {
    line-height: 22px;
  }
`;
