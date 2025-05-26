import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/Auth/AuthContext';
import Login from '@/Pages/Auth/Login';
import Home from '@/Pages/Client/Home';
import PrivateRoute from '@/Pages/Auth/PrivateRoutes';
import PrivateRouteAdmin from '@/Pages/Auth/PrivateRouteAdmin';
import PublicRoute from '@/Pages/Auth/PublicRoutes';
import Form from '@/Pages/Admin/Product/Form';
import Index from '@/Pages/Admin/Product/Index';

function App() {
  
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route 
                   path='/'
                   element={ <PublicRoute><Login /></PublicRoute> }
            />
            <Route 
                   path='/dashboard' 
                   element={ <PrivateRoute><Home /></PrivateRoute> }
            />
            <Route 
                   path='/dashboard' 
                   element={ <PrivateRoute><Home /></PrivateRoute> }
            />
            <Route 
                   path='/admin/product/' 
                   element={ <PrivateRouteAdmin><Index /></PrivateRouteAdmin> }
            />
            <Route 
                   path='/admin/product/create' 
                   element={ <PrivateRouteAdmin><Form /></PrivateRouteAdmin> }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App
