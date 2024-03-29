import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import Spinner from '@/components/Spinner';

export default function EditProductPage() {
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
    <Layout>
      <button onClick={() => router.back()}>
        <Icon iconName="arrow-back" color={'none'} />
      </button>

      <h1 className="text-xl font-semibold">Edit product</h1>

      {isLoading && <Spinner />}
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
