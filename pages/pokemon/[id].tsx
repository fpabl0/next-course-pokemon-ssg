import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from 'canvas-confetti';

type Props = Pokemon;

type Params = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const pokemonIds = [...Array(151)].map((v, index) => {
    return `${index + 1}`;
  });
  return {
    paths: pokemonIds.map(id => ({
      params: { id }
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { id } = ctx.params!;
  const info = await getPokemonInfo(id);

  if (!info) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: { ...info },
    revalidate: 86400, // 60 * 60 * 24
  };
};

// ===============================================================
// Page
// ===============================================================

const PokemonPage = ({ id, name, sprites }: Props) => {

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existsInFavorites(id));
  }, [id]);

  const onToggleFavorites = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  return (
    <Layout title={name[0].toUpperCase() + name.substring(1)}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>

        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8} >
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text transform="capitalize" h1>{name}</Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorites}
              >
                {isInFavorites ? "En favoritos" : "Guardar en Favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  );
};


export default PokemonPage;