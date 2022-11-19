import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        {/* 
        * Quando o usuário carregar a página, pelo lado do servidar, o cógio css necessário será retornado dessa função; 
        * Stitches por padrao renderiza o código em run time;
        * Dessa forma, temos css em ssr
        */}
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        {/* Em qual lugar da minha app vão os conteúdos das páginas */}
        <Main />
        {/* Em qual local do nosso HTML, queremos carregar os scripts da página */}
        <NextScript />
      </body>
    </Html>
  )
}

{/* Index html do meu projeto. Apenas coisa que quero em todos meus arquivos/páginas */ }