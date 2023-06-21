import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';
import Spinner from '@/components/Spinner';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(',')
      }))
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete('/api/categories?_id=' + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <button onClick={() => router.back()}>
        <Icon iconName="arrow-back" color={'none'} />
      </button>

      <h2 className={'text-xl font-semibold'}>Categories</h2>

      <form onSubmit={saveCategory} className={'mt-4'}>
        <div className="flex flex-col gap-1 md:flex-row">
          <input
            type="text"
            placeholder={'Category name'}
            className={'mb-4 rounded-lg py-3 text-sm text-gray-900'}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
            className={'mb-4 rounded-lg py-3 text-sm text-gray-900'}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option value={category._id} key={category._id + index}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>

          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="mb-2 flex gap-1" key={property.name + index}>
                <input
                  type="text"
                  value={property.name}
                  className="rounded-lg py-3 text-sm text-gray-900"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />

                <input
                  type="text"
                  className="rounded-lg py-3 text-sm text-gray-900"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />

                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className=""
                >
                  <Icon
                    iconName={'delete'}
                    color={'none'}
                    className={'text-red-600'}
                  />
                </button>
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-1 md:flex-row">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="min-w-[120px] rounded-md border bg-slate-200 px-4  py-2 transition-all hover:bg-slate-300"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn-primary min-w-[120px] rounded-md border px-4 py-2  transition-all hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:hover:bg-gray-300"
            disabled={!name}
          >
            Save
          </button>

          <button
            onClick={addProperty}
            type="button"
            className="min-w-[120px] rounded-md border bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-600"
          >
            Add new property
          </button>
        </div>
      </form>

      {isLoading && (
        <div>
          <div colSpan={3}>
            <div className="py-4">
              <Spinner fullWidth={true} />
            </div>
          </div>
        </div>
      )}

      {!editedCategory && (
        <div className="basic mt-4">
          <div className={'mt-4 w-full rounded-md bg-gray-200 p-6'}>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <div
                  className={'flex flex-col justify-between py-4 md:flex-row'}
                  key={category.name + index}
                >
                  <span className={'font-semibold'}>{category.name}</span>
                  <span>{category?.parent?.name}</span>

                  <div className={'mt-2'}>
                    <button
                      onClick={() => editCategory(category)}
                      className="bg-sla mb-1 mr-2 w-full rounded-md border bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-600 md:min-w-[120px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="w-full rounded-md border bg-error px-4 py-2 text-white transition-all hover:bg-red-500 md:min-w-[120px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
