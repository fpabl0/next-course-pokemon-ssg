import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { useState, useEffect } from 'react';
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";

const FavoritesPage = () => {

  const [favorites, setFavorites] = useState([] as number[]);

  useEffect(() => {
    setFavorites(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemon - Favoritos">

      {
        favorites.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons pokemonIds={favorites} />)
      }

    </Layout>
  );
};

export default FavoritesPage;