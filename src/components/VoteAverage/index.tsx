import React from 'react';

import { Container } from './styles';

interface Props {
  size?: number;
  voteAverage: number;
  positionAbsolute?: boolean;
}

const VoteAverage: React.FC<Props> = ({
  voteAverage,
  size = 64,
  positionAbsolute = false,
}: Props) => {
  return (
    <Container
      size={size}
      isPositionAbsolute={positionAbsolute}
      className="vote-average"
    >
      <big>{voteAverage * 10}</big>
      <small> %</small>
    </Container>
  );
};

export default VoteAverage;
