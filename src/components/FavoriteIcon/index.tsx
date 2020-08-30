import React, { useState, useCallback, useEffect } from 'react';

import { Container, FilledHeartIcon, BorderedHeartIcon } from './styles';

interface Props {
  isActive: boolean;
  onClick(bool: boolean): void;
}

const FavoriteIcon: React.FC<Props> = ({ isActive, onClick: handleClick }) => {
  /**
   * useState(isActive) é apenas o valor inicial. Se isActive mudar depois
   * é necessário o useEffect.
   */
  const [isFavorite, setIsfavorite] = useState(isActive);

  useEffect(() => {
    setIsfavorite(isActive);
  }, [isActive]);

  const internalHandleClick = useCallback(() => {
    handleClick(isFavorite);

    setIsfavorite(!isFavorite);
  }, [isFavorite, handleClick]);

  return (
    <Container onClick={internalHandleClick}>
      {isFavorite ? <FilledHeartIcon /> : <BorderedHeartIcon />}
    </Container>
  );
};

export default FavoriteIcon;
