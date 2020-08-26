import React, { useState, useCallback } from 'react';

import { Container, FilledHeartIcon, BorderedHeartIcon } from './styles';

interface Props {
  isActive: boolean;
  onClick(bool: boolean): void;
}

const FavoriteIcon: React.FC<Props> = ({ isActive, onClick: handleClick }) => {
  const [isFavorite, setIsfavorite] = useState(isActive);

  const internalHandleClick = useCallback(() => {
    console.log('internal handle click');

    handleClick(true);

    setIsfavorite(!isFavorite);
  }, [isFavorite, handleClick]);

  return (
    <Container onClick={internalHandleClick}>
      {isFavorite ? <FilledHeartIcon /> : <BorderedHeartIcon />}
    </Container>
  );
};

export default FavoriteIcon;
