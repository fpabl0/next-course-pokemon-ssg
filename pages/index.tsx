import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import type { GetStaticProps } from 'next';
import { pokeApi } from "../api/pokeApi";
import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { PokemonListResponse, SmallPokemon } from '../interfaces';

type Props = {
  pokemons: SmallPokemon[];
};

const HomePage = ({ pokemons }: Props) => {

  return (
    <Layout title="Listado de Pokemons">

      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(p => (
            <PokemonCard key={p.id} {...p} />
          ))
        }
      </Grid.Container>

    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {

  const resp = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = resp.data.results.map(v => {
    const parts = v.url.split('/');
    const id = parseInt(parts[parts.length - 2]);
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return {
      ...v,
      id,
      img,
    };
  });

  return { props: { pokemons } };
};

export default HomePage;
