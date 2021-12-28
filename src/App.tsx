import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

type AlbumType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}[];

function App() {
  const [albums, albumsSet] = useState<AlbumType>([]);
  const [photos, photosSet] = useState<AlbumType>([]);
  const [showAlbum, showAlbumSet] = useState<boolean>(false);
  const [homePage, homePageSet] = useState<boolean>(true);

  const getAlbums = useCallback(async () => {
    const endpoint = "https://jsonplaceholder.typicode.com/photos";
    const res = await axios.get(endpoint);
    albumsSet(res.data);
  }, [albumsSet]);

  const filterPhotos = useCallback(
    (n) => {
      const result = albums.filter((obj) => {
        return obj.albumId === n;
      });
      photosSet(result);
      homePageSet(false);
      showAlbumSet(true);
    },
    [photosSet, homePageSet, showAlbumSet]
  );

  const displayPhoto = useCallback((id) => {
    return (
      <div>
        <img src='' alt='' />
      </div>
    );
  }, []);

  useEffect(() => {
    getAlbums();
  }, []);

  if (homePage) {
    return (
      <div>
        <button type='button' onClick={() => filterPhotos(1)}>
          Album 1
        </button>
        <button type='button' onClick={() => filterPhotos(2)}>
          Album 2
        </button>
        <button type='button' onClick={() => filterPhotos(3)}>
          Album 3
        </button>
      </div>
    );
  }

  return (
    <div className='App'>
      <div>
        <h1>Album Photos</h1>
      </div>
      <div>
        <div>
          <button type='button' onClick={() => homePageSet(true)}>
            Back to HomePage
          </button>
        </div>
        <div>
          {photos.map((photo) => {
            const { id, title, url, thumbnailUrl } = photo;
            return (
              <div key={id}>
                <h4>{title}</h4>
                <img
                  src={thumbnailUrl}
                  alt={title}
                  onClick={() => displayPhoto(id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
