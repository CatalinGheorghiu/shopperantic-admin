import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@/components/Spinner';
import { withSwal } from 'react-sweetalert2';

function SettingsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get('/api/products').then((res) => {
      setProducts(res?.data);
    });
    await axios.get('/api/settings?name=featuredProductId').then((res) => {
      setFeaturedProductId(res?.data?.value);
    });
    await axios.get('/api/settings?name=shippingFee').then((res) => {
      setShippingFee(res?.data?.value);
    });
  }

  async function saveSettings() {
    setIsLoading(true);
    await axios.put('/api/settings', {
      name: 'featuredProductId',
      value: featuredProductId
    });
    await axios.put('/api/settings', {
      name: 'shippingFee',
      value: shippingFee
    });
    setIsLoading(false);
    await swal.fire({
      title: 'Settings saved!',
      icon: 'success'
    });
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <label>
            Featured product
            <select
              className="mb-4 mt-2 rounded-lg py-3 text-sm text-gray-900"
              value={featuredProductId}
              onChange={(ev) => setFeaturedProductId(ev.target.value)}
            >
              {products.length > 0 &&
                products.map((product, index) => (
                  <option value={product._id} key={product._id + index}>
                    {product.title}
                  </option>
                ))}
            </select>
          </label>

          <label>
            <span>Shipping price (in usd)</span>
            <input
              className="mb-4 mt-2 rounded-lg py-3 text-sm text-gray-900"
              type="number"
              value={shippingFee}
              onChange={(ev) => setShippingFee(ev.target.value)}
            />
          </label>
          <div>
            <button onClick={saveSettings} className="btn-primary">
              Save settings
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
