import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/products?id=' + id).then((response) => {
      setIsLoading(false);
      setProductInfo(response.data);
    });
  }, [id]);

  async function goBack() {
    await router.push('/products');
  }

  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);
    await goBack();
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-120px)] flex-col justify-center">
        <h1 className="text-center">
          Do you really want to delete{' '}
          <span className="font-bold">{productInfo?.title}</span>?
        </h1>
        <div className="flex justify-center gap-2">
          <button
            onClick={deleteProduct}
            className="btn-primary min-w-[120px] rounded-md border px-4 py-2  transition-all hover:bg-lime-600"
          >
            Yes
          </button>
          <button
            className="min-w-[120px] rounded-md border bg-error px-4 py-2 text-white transition-all hover:bg-red-500"
            onClick={goBack}
          >
            No
          </button>
        </div>
      </div>
    </Layout>
  );
}
