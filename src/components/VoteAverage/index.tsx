import React from 'react';

import { Container } from './styles';

interface Props {
  size?: number;
  voteAverage: number;
}

const VoteAverage: React.FC<Props> = ({ voteAverage, size = 64 }: Props) => {
  return (
    <Container size={size}>
      <div>
        <big>{voteAverage * 10}</big>
        <small> %</small>
      </div>
    </Container>
  );
};

export default VoteAverage;
