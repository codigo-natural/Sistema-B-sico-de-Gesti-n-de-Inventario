import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { api } from "../services/api";
import { PlusIcon, MinusIcon } from 'lucide-react';

const schema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      product: yup.number().required('Producto es requerido'),
      warehouse: yup.number().required('Bodega es requerida'),
      quantity: yup.number().integer('Cantidad debe ser un entero').min(1, 'Cantidad debe ser un número positivo').required('Cantidad es requerida'),
      price: yup.number().positive('Precio debe ser positivo').required('Precio es requerido')
    })
  ).min(1, 'Al menos un ítem es requerido')
});

export const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [{ product: '', warehouse: '', quantity: '', price: '' }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  useEffect(() => {
    fetchProducts();
    fetchWarehouses();
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      // TODO: Agregar manejo de errores amigable para el usuario
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      // TODO: Agregar manejo de errores amigable para el usuario
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/warehouse');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error al obtener bodegas:', error);
      // TODO: Agregar manejo de errores amigable para el usuario
    }
  };

  const onSubmit = async (data) => {
    try {
      const totalAmount = data.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      const salesData = { ...data, total_amount: totalAmount };

      await api.post('/sales-detail/', salesData);
      fetchSales();
      reset();
    } catch (error) {
      console.error('Error al crear venta:', error);
      // TODO: Agregar manejo de errores amigable para el usuario
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Crear Nueva Venta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-wrap items-center gap-4 pb-4 border-b">
              <div className="w-full sm:w-1/4">
                <label htmlFor={`product-${index}`} className="block text-sm font-medium text-gray-200 mb-1">
                  Producto
                </label>
                <select
                  id={`product_${index}`}
                  {...register(`items.${index}.product`)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar Producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
                {errors.items?.[index]?.product && (
                  <p className="mt-1 text-sm text-red-600">{errors.items[index].product.message}</p>
                )}
              </div>

              <div className="w-full sm:w-1/4">
                <label htmlFor={`warehouse-${index}`} className="block text-sm font-medium text-gray-200 mb-1">
                  Bodega
                </label>
                <select
                  id={`warehouse_${index}`}
                  {...register(`items.${index}.warehouse`)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar Bodega</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                  ))}
                </select>
                {errors.items?.[index]?.warehouse && (
                  <p className="mt-1 text-sm text-red-600">{errors.items[index].warehouse.message}</p>
                )}
              </div>

              <div className="w-full sm:w-1/6">
                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-200 mb-1">
                  Cantidad
                </label>
                <input
                  id={`quantity`}
                  type="number"
                  {...register(`items.${index}.quantity`)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Cantidad"
                />
                {errors.items?.[index]?.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.items[index].quantity.message}</p>
                )}
              </div>

              <div className="w-full sm:w-1/6">
                <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-200 mb-1">
                  Precio
                </label>
                <input
                  id={`price-${index}`}
                  type="number"
                  step="0.01"
                  {...register(`items.${index}.price`)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Precio"
                />
                {errors.items?.[index]?.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.items[index].price.message}</p>
                )}
              </div>

              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <MinusIcon className="h-4 w-4 mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => append({ product: '', warehouse: '', quantity: '', price: '' })}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Agregar Ítem
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Venta
            </button>
          </div>

          {errors.items && (
            <p className="mt-2 text-sm text-red-600">{errors.items.message}</p>
          )}
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Ventas Recientes</h2>
        <ul className="space-y-4">
          {sales.map((sale) => (
            <li key={sale.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Venta ID: {sale.id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Total: ${sale.total}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  {sale.items && sale.items.map((item, index) => (
                    <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                      <dt className="text-sm font-medium text-gray-500">
                        Producto
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item.product_name} - Cantidad: {item.quantity}, Precio: ${item.price}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Sales;