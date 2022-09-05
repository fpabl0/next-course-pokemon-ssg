import { Pokemon } from '../interfaces/pokemon-details';
import { pokeApi } from '../api/pokeApi';


export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    return { id: data.id, name: data.name, sprites: data.sprites } as Pokemon;
  } catch (error) {
    return null;
  }
};