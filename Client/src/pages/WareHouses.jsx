import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { api } from '../services/api';

export const WarehousePage = () => {
  const [bodegas, setBodegas] = useState([]);
  const [editingBodega, setEditingBodega] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchBodegas();
  }, []);

  const fetchBodegas = async () => {
    try {
      const response = await api.get('/warehouse/');
      setBodegas(response.data);
    } catch (error) {
      console.error('Error fetching bodegas:', error);
      // TODO: Add user-friendly error handling
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingBodega) {
        await api.put(`/warehouse/${editingBodega.id}/`, data);
      } else {
        await api.post('/warehouse/', data);
      }
      fetchBodegas();
      reset();
      setEditingBodega(null);
    } catch (error) {
      console.error('Error submitting bodega:', error);
      // TODO: Add user-friendly error handling
    }
  };

  const handleEdit = (bodega) => {
    setEditingBodega(bodega);
    setValue('nombre', bodega.nombre);
    setValue('ubicacion', bodega.ubicacion);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta bodega?')) {
      try {
        await api.delete(`/warehouse/${id}/`);
        fetchBodegas();
      } catch (error) {
        console.error('Error deleting bodega:', error);
        // TODO: Add user-friendly error handling
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Bodegas</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingBodega ? 'Editar' : 'Agregar'} Bodega
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                {...register('nombre', { required: 'El nombre es requerido' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Nombre de la bodega"
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                id="ubicacion"
                type="text"
                {...register('ubicacion', { required: 'La ubicación es requerida' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Ubicación de la bodega"
              />
              {errors.ubicacion && (
                <p className="mt-1 text-sm text-red-600">{errors.ubicacion.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingBodega ? 'Actualizar' : 'Agregar'} Bodega
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Lista de Bodegas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-600 divide-y divide-gray-200">
              {bodegas.map((bodega) => (
                <tr key={bodega.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{bodega.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bodega.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(bodega)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(bodega.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="sr-only">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
