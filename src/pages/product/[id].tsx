import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { formatPrice } from '../../utils/formatPrice';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log(product.defaultPriceId);

  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={400} alt="Imagem do produto" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>
          {product.description}
        </p>

        <button onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MpyE9tw7FkAcK0' } }
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const productResponse = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = productResponse.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: productResponse.id,
        name: productResponse.name,
        imageUrl: productResponse.images[0],
        price: formatPrice(price.unit_amount),
        description: productResponse.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}