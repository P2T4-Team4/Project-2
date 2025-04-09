import { Outlet, Navigate } from 'react-router-dom';
import auth from './utils/auth.js';
import Navbar from './components/Navbar.js';

function App() {

  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
