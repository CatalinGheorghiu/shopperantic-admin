import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@/components/Spinner';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <button onClick={() => router.back()}>
        <Icon iconName="arrow-back" color={'none'} />
      </button>

      <div className={'flex items-center justify-between px-4 md:px-0'}>
        <h2 className={'text-xl font-semibold'}>Products</h2>
        <Link className="btn-primary" href={'/products/new'}>
          Add new product
        </Link>
      </div>

      {isLoading && (
        <div className="py-4">
          <Spinner fullWidth={true} />
        </div>
      )}

      <div className={'mt-8 bg-white'}>
        <div className="filters"></div>
        <ul className="">
          {products.map((product) => (
            <li
              className={'flex border-t border-gray-200 p-4'}
              key={product._id}
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                height={128}
                width={128}
                className={
                  'mr-4 h-32 w-32 min-w-[8rem] border-2 border-gray-300 object-cover'
                }
              />
              <div className="flex w-full flex-col justify-between md:flex-row md:justify-between">
                <div className="md:flex md:flex-col">
                  <h3 className="font-semibold">{product.title}</h3>

                  <span className={'text-xs text-gray-500'}>
                    {product.category.name}
                  </span>

                  <span
                    className={'pt-3 pr-4 text-justify text-xs text-gray-500'}
                  >
                    {product.short_description}
                  </span>

                  <div className="flex h-full items-end pt-4">
                    <Link
                      href={'/products/edit/' + product._id}
                      className="mr-1"
                    >
                      <Icon iconName={'edit'} color={'none'} />
                    </Link>

                    <Link href={'/products/delete/' + product._id}>
                      <Icon
                        iconName={'delete'}
                        color={'none'}
                        className={'text-red-600'}
                      />
                    </Link>
                  </div>
                </div>
                <span className="lg:flex-grow lg:text-right">
                  ${product.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
