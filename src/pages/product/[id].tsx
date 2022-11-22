import { useRouter } from 'next/router'

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, quod. Architecto debitis aperiam, aspernatur doloremque vitae dolorum similique illum. A explicabo deserunt dignissimos aliquam et dolores optio nesciunt esse reiciendis.
        </p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}