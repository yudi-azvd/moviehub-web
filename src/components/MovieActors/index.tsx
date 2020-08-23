import React from 'react';

import { Actor as ActorProps } from '../../entities';

import { Container, Actor, UserIcon, DefaultActor } from './styles';

interface Props {
  actors: ActorProps[];
}

const MovieActors: React.FC<Props> = ({ actors }: Props) => {
  if (!actors) {
    return (
      <Container>
        <h2>Carregando elenco ...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Elenco principal</h2>

      <div className="scrollable-actors">
        {actors.map((actor) => (
          <Actor key={actor.id}>
            {actor.profilePath.endsWith('.jpg') ? (
              <img src={actor.profilePath} alt={actor.name} />
            ) : (
              <DefaultActor>
                <UserIcon />
              </DefaultActor>
            )}
            <strong>{actor.name}</strong>
            <span>{actor.character}</span>
          </Actor>
        ))}
      </div>
    </Container>
  );
};

export default MovieActors;
