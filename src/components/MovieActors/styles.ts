import styled from 'styled-components';
// import { User } from 'styled-icons/boxicons-solid';

export const Container = styled.div`
  margin: 30px 50px;

  div.scrollable-actors {
    display: flex;
    padding-bottom: 12px;

    overflow-x: scroll;

    ::-webkit-scrollbar {
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background: #5558;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
      background: #4441;
    }
  }

  h2 {
    display: block;
    margin-bottom: 12px;
  }
`;

export const Actor = styled.div`
  --image-border-radius: 8px;

  border: 1px solid #ccc;
  border-radius: var(--image-border-radius);
  min-width: 138px;
  margin-right: 16px;
  padding-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img,
  strong,
  span {
    display: block;
  }

  img {
    margin-bottom: 10px;
    border-top-left-radius: var(--image-border-radius);
    border-top-right-radius: var(--image-border-radius);
  }

  strong,
  span {
    margin-left: 10px;
  }
`;

export const Avatar = styled.img``;
