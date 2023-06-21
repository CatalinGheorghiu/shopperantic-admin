import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  short_description: existingShortDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [shortDescription, setShortDescription] = useState(
    existingShortDescription || ''
  );
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setCategoriesLoading(true);
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      short_description: shortDescription,
      price,
      images,
      category,
      properties: productProperties
    };
    if (_id) {
      //update
      await axios.put('/api/products', { ...data, _id });
    } else {
      //create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(
      ({ _id, name }) => _id === category || _id === category._id
    );

    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        className="mb-4 rounded-lg py-3 text-sm text-gray-900"
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <select
        value={category}
        className="mb-4 rounded-lg py-3 text-sm text-gray-900"
        onChange={(ev) => setCategory(ev.target.value)}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c, index) => (
            <option key={c._id + index} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {categoriesLoading && <Spinner />}

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((properties, index) => (
          <div key={properties.name + index}>
            <label>{}</label>
            <div>
              <select
                value={productProperties[properties.name]}
                className="mb-4 mt-2 rounded-lg py-3 text-sm text-gray-900"
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {properties.values.map((value, index) => (
                  <option key={value + index} value={value}>
                    {properties.name[0].toUpperCase() +
                      properties.name.substring(1)}
                    : {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <div className="mb-4 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images?.map((link) => (
              <div
                key={link}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={link}
                  alt={link}
                  height={128}
                  width={128}
                  className="h-32 w-32 rounded-lg object-cover"
                />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="flex h-24 items-center">
            <Spinner />
          </div>
        )}
        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-primary bg-white text-center text-sm text-primary shadow-sm">
          <Icon iconName={'upload'} color={'none'} />
          <div className="text-sm text-gray-900">Add image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <textarea
        placeholder="Description"
        value={description}
        className="mb-4 mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        rows="6"
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <textarea
        placeholder="Short description"
        value={shortDescription}
        className="mb-4 mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        rows={4}
        onChange={(ev) => setShortDescription(ev.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        className="mb-4 rounded-lg py-3 text-sm text-gray-900"
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button
        type="submit"
        className="btn-primary min-w-[8rem] text-sm text-gray-900"
      >
        Save
      </button>
    </form>
  );
}
