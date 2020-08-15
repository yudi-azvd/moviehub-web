import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin-bottom: 24px;

  @media (min-width: 768px) {
    padding-left: 36px;
    width: 50%;
  }

  button.write {
    margin-top: 8px;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  > form {
    div.buttons {
      display: flex;
      justify-content: space-between;

      button.save {
        width: 60%;
      }

      button.cancel {
        width: 35%;
        background: #999;

        &:hover {
          background: ${shade(0.2, '#999')};
        }
      }
    }
  }
`;
