
// _app funciona como um container para as páginas da nossa aplicação.

import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

globalStyles(); // fica fora, já que os estilos globais não mudam de acordo com a página;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

