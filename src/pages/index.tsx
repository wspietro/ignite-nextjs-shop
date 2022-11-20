import Image from "next/image";
import { GetStaticProps } from 'next'
import { stripe } from '../lib/stripe';

import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
};

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

// Solução para chamada API em SSR;
// Se desabilitarmos o JS (forma que o SEO é lido), nossa página estará com o conteúdo;
// Código não fica visível ao usuário;
// Págin a só é carregada após a chamada;
// SSG serverSideProps vs staticProps. Não temos acesso ao contexto da requisição (req, res, headers, cookies).

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount, // centavos (multiplicado por 100)
    }
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

// preco é relacionamento com o produto. Dessa forma, precisamos expandir o objeto default_price para acessar

