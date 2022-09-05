import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from "../../interfaces";
import { useRouter } from 'next/router';

type Props = SmallPokemon;

export const PokemonCard = ({ id, name, img }: Props) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={img}
            width="100%"
            height={140}
            loading='lazy'
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};