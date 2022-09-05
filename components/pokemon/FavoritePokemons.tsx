import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

type Props = {
  pokemonIds: number[];
};

export const FavoritePokemons = ({ pokemonIds }: Props) => {
  return (
    <Grid.Container gap={2} direction='row' justify="flex-start">
      {
        pokemonIds.map(id => (
          <FavoriteCardPokemon key={id} id={id} />
        ))
      }
    </Grid.Container>
  );
};
