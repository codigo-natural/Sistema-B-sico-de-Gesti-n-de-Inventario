import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { api } from "../services/api";

const schema = yup.object().shape({
  product: yup.number().required('Producto es requerido'),
  warehouse: yup.number().required('Almacén es requerido'),
  quantity: yup.number().integer('Cantidad debe ser un número entero').min(0, 'Cantidad debe ser no negativa').required('Cantidad es requerida'),
});

export const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoryRes, productsRes, warehousesRes] = await Promise.all([
          api.get('/inventory'),
          api.get('/products'),
          api.get('/warehouse/')
        ]);
        setInventory(inventoryRes.data);
        setProducts(productsRes.data);
        setWarehouses(warehousesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/inventory/', data);
      const response = await api.get('/inventory');
      setInventory(response.data);
      reset();
    } catch (error) {
      console.error('Error creating inventory:', error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Inventario</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Actualizar Inventario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-200">Seleccionar Producto</label>
            <select
              id="product"
              {...register("product")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            {errors.product && <p className="mt-2 text-sm text-red-600">{errors.product.message}</p>}
          </div>

          <div>
            <label htmlFor="warehouse" className="block text-sm font-medium text-gray-200">Seleccionar Almacén</label>
            <select
              id="warehouse"
              {...register("warehouse")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un almacén</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
            {errors.warehouse && <p className="mt-2 text-sm text-red-600">{errors.warehouse.message}</p>}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-200">Cantidad</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar Inventario
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Inventario Actual</h2>
        <ul className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <li key={item.id} className="py-4">
              <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
              <p className="text-sm text-gray-500">Almacén: {item.warehouse.name} - Cantidad: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
