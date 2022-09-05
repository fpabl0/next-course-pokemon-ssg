import { GetStaticProps, GetStaticPaths } from 'next';
import { PokemonListResponse, Pokemon } from '../../interfaces';
import { pokeApi } from '../../api/pokeApi';
import { default as PokemonPage } from '../pokemon/[id]';
import { getPokemonInfo } from "../../utils";

type Props = Pokemon;

type Params = {
  name: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const names = data.results.map(p => p.name);
  return {
    paths: names.map(n => ({
      params: { name: n }
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { name } = ctx.params!;
  const info = await getPokemonInfo(name);
  return { props: { ...info } };
};


// ===============================================================
// Page
// ===============================================================

const PokemonByNamePage = (props: Props) => {
  return PokemonPage(props);
};

export default PokemonByNamePage;