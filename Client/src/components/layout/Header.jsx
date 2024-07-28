import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to='/' className='text-2xl font-bold'>Amazon Inventory</Link>
        <div>
          {

          }
          <Link to='/dashboard' className='mx-2'>Dashboard</Link>
          <Link to='/products' className='mx-2'>Products</Link>
          <Link to='/inventory' className='mx-2'>Inventory</Link>
          <Link to='/sales' className='mx-2'>Sales</Link>
          <Link to='/warehouses' className='mx-2'>Warehouse</Link>
          <Link to='/login' className='mx-2'>Login</Link>
          <Link to='/register' className='mx-2'>Register</Link>
        </div>
      </nav>
    </header>
  )
}
