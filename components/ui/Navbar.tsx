import { Spacer, Text, useTheme, Link as UILink } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
      padding: '0px 20px',
      backgroundColor: theme?.colors.gray900.value,
    }}>

      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png"
        alt="icono de la app"
        width={70}
        height={70}
      />

      <Link href="/">
        <UILink>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okémon!</Text>
        </UILink>
      </Link>

      <Spacer css={{ flex: 1 }} />

      <Link href="/favorites">
        <UILink>
          <Text color='white'>Favoritos</Text>
        </UILink>
      </Link>
    </div>
  );
};