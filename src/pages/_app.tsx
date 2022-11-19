
// _app funciona como um container para as páginas da nossa aplicação;
// Ele é carregado em todas as páginas.

import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

import Image from 'next/image';

globalStyles(); // fica fora, já que os estilos globais não mudam de acordo com a página;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Logo ignite shop" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

