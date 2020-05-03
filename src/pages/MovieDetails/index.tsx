import React, { useEffect, useState } from 'react';

import api from '../../services/api';

const MovieDetails: React.FC = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function loadThingFromApi(): Promise<void> {
      const response = await api.get('/movies/550');
      setTitle(response.data.title);
    }

    loadThingFromApi();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default MovieDetails;
