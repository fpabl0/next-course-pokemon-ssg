import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "../ui";

const origin = (typeof window === 'undefined') ? "" : window.location.origin;

type Props = {
  title?: string;
  children: ReactNode[] | ReactNode;
};

export const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Pablo Fuentes" />
        <meta name="description" content={`Información sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title},pokemon,pokedex`} />

        {/* Open Graph Meta tags */}
        <meta property="og:title" content={`Información sobre el pokemon ${title}`} />
        <meta property="og:description" content={`Esta es la página de ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>

    </>
  );
};