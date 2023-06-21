import Icon from '@/components/Icon';
import ProductForm from '@/components/ProductForm';
import Layout from '@/components/Layout';

export default function NewProduct() {
  return (
    <Layout>
      <button onClick={() => router.back()}>
        <Icon iconName="arrow-back" color={'none'} />
      </button>

      <h2 className="pb-4 text-xl font-semibold">Add Product</h2>
      <ProductForm />
    </Layout>
  );
}
