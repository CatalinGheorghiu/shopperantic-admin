import ProductForm from '@/components/ProductForm';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Product = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      {isLoading && <Spinner />}
      <button onClick={() => router.back()}>Go back</button>
      {productInfo && <h2>{productInfo._id}</h2>}
    </>
  );
};

export default Product;
