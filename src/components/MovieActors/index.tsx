import React from 'react';

import { Container, Actor } from './styles';

interface ActorProps {
  id: number;
  character: string;
  name: string;
  profilePath: string;
}

interface Props {
  actors: ActorProps[];
}

const MovieActors: React.FC<Props> = ({ actors }: Props) => {
  if (!actors) {
    return (
      <Container>
        <h2>Carregando elenco...</h2>
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
              <p>oi</p>
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
