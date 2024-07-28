import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { api } from '../services/api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('price is requires'),
  sku: yup.string().required('sku is required'),
})

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}/`, data);
      } else {
        await api.post('/products/', data);
      }
      fetchProducts()
      reset()
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving products', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    reset(product)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='mb-8 bg-white p-6 rounded shadow-md'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('name')}
              placeholder="Name"
              className="border p-2 w-full rounded text-black"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <input
              {...register('description')}
              placeholder="Description"
              className="border p-2 w-full rounded text-black"
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div>
            <input
              {...register('price')}
              type="number"
              step="0.01"
              placeholder="Price"
              className="border p-2 w-full rounded text-black"
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <input
              {...register('sku')}
              placeholder="SKU"
              className="border p-2 w-full rounded text-black"
            />
            {errors.sku && <span className="text-red-500">{errors.sku.message}</span>}
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {editingProduct ? 'Update' : 'Add'} Product
        </button>
      </form>

      <div className='bg-white p-6 rounded shadow-md'>
        <h2 className="text-xl font-bold mb-4 text-black">Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4 flex items-center justify-between">
              <span className='text-black'>{product.name} - ${product.price}</span>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Delete
                </button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
