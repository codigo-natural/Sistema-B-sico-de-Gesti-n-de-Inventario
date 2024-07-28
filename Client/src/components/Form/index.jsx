import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { api } from "../../services/api";

export const Form = ({ route, method }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post(route, data);
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col">
        <input
          className={`border p-2 rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300 text-black'}`}
          type="text"
          placeholder="Username"
          {...register('username', { required: "Username is required" })}
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
      </div>

      <div className="flex flex-col">
        <input
          className={`border p-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300 text-black'}`}
          type="password"
          placeholder="Password"
          {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : name}
      </button>
    </form>
  );
};
