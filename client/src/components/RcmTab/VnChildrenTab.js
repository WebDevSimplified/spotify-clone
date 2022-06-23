import React from 'react'
import { Artist } from 'react-spotify-api';

function VietnamTab({id}) {
    return (<Artist id={id}>
    {({ data, loading, error }) =>
      data ? (
        <div>
          <h1>{data.name}</h1>
          <ul>
            {data.genres.map(genre => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      ) : null
    }
  </Artist>)
}

export default VietnamTab