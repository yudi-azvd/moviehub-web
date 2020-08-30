import React, { useState, useCallback, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, FilledHeartIcon, BorderedHeartIcon } from './styles';

interface Props {
  isActive: boolean;
  onClick(bool: boolean): void;
}

const FavoriteIcon: React.FC<Props> = ({ isActive, onClick: handleClick }) => {
  const { user } = useAuth();
  /**
   * useState(isActive) é apenas o valor inicial. Se isActive mudar depois
   * é necessário o useEffect.
   */
  const [isFavorite, setIsFavorite] = useState(isActive);

  useEffect(() => {
    setIsFavorite(isActive);
  }, [isActive]);

  /**
   * Esse código está ruim. precisa de refatoração pra deixar mais claro
   */
  const internalHandleClick = useCallback(() => {
    handleClick(isFavorite);

    if (!user) return;

    setIsFavorite(!isFavorite);
  }, [isFavorite, handleClick, user]);

  return (
    <Container onClick={internalHandleClick}>
      {isFavorite ? <FilledHeartIcon /> : <BorderedHeartIcon />}
    </Container>
  );
};

export default FavoriteIcon;
