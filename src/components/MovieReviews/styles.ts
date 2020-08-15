import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;

  > h2 {
    margin-bottom: 8px;
  }
`;

interface ContentProps {
  hasReviewForm?: boolean;
}

export const Content = styled.div<ContentProps>`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: ${(props) => (props.hasReviewForm ? 'row-reverse' : 'row')};
    justify-content: space-between;
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
  background: #fff;

  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  > strong {
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
  }

  > div {
    line-height: 22px;
  }

  > section {
    text-align: right;

    > time {
      color: #0005;
    }
  }
`;
