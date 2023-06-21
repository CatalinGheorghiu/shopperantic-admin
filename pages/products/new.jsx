import ProductForm from '@/components/ProductForm';
import Layout from '@/components/Layout';

export default function NewProduct() {
  return (
    <Layout>
      <h2 className="pb-4 text-xl font-semibold">Add Product</h2>
      <ProductForm />
    </Layout>
  );
}
