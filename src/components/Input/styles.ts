import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  color: #171717;
  width: 100%;

  & + div {
    margin-top: 12px;
  }

  label {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 62px;

    span {
      margin-bottom: 4px;
    }

    input {
      padding: 0px 14px;
      color: #171717;
      flex: 1;
      border-radius: 10px;
      border: 2px solid #171717;
      background: transparent;
    }
  }

  span.error-message {
    color: #c53030;
  }
`;
