import { useEffect, useState } from "react";
import { api } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [salesData, setSalesData] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      const productResponse = await api.get('/products');
      const salesResponse = await api.get('/sales');
      console.log('sales res', salesResponse);

      const totalProducts = productResponse.data.length;
      console.log('total products', productResponse.data.length);
      const totalSales = salesResponse.data.length;
      const totalRevenue = salesResponse.data.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);
      console.log('total revenue', totalRevenue);

      setStats({
        totalProducts,
        totalSales,
        totalRevenue
      });
      setSalesData(salesResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
    console.log('stats:', stats);
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold text-black">Total Products</h2>
          <p className="text-3xl font-bold text-blue-700">{stats.totalProducts}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold text-black">Total Sales</h2>
          <p className="text-3xl font-bold text-blue-700">{stats.totalSales}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl font-semibold text-black">Total Revenue</h2>
          <p className="text-3xl font-bold text-blue-700">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      <section className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold mb-4">Estadísticas de Ventas</h1>
        <BarChart width={600} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </section>
    </div>
  );
};
