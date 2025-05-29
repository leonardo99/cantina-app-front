import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/Auth/AuthContext';
import Login from '@/Pages/Auth/Login';
import Home from '@/Pages/Client/Home';
import PrivateRoute from '@/Pages/Auth/PrivateRoutes';
import PrivateRouteAdmin from '@/Pages/Auth/PrivateRouteAdmin';
import PublicRoute from '@/Pages/Auth/PublicRoutes';
import Form from '@/Pages/Admin/Product/Form';
import Index from '@/Pages/Admin/Product/Index';
import Edit from '@/Pages/Admin/Product/Edit';
import Category from '@/Pages/Admin/Category/Index';
import FormCategory from '@/Pages/Admin/Category/Form';
import Orders from '@/Pages/Client/Order/Orders';
import DependentForm from '@/Pages/Client/Dependent/Form';
import DependentList from '@/Pages/Client/Dependent/DependentList';
import AdminRegister from './Pages/Auth/Admin/Register';
import ClientRegister from './Pages/Auth/Client/Register';

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
                   path='/admin/register'
                   element={ <PublicRoute><AdminRegister /></PublicRoute> }
            />
            <Route 
                   path='/client/register'
                   element={ <PublicRoute><ClientRegister /></PublicRoute> }
            />
            <Route 
                   path='/dashboard' 
                   element={ <PrivateRoute><Home /></PrivateRoute> }
            />

            <Route 
                   path='/user/order' 
                   element={ <PrivateRoute><Orders /></PrivateRoute> }
            />
            <Route 
                   path='/user/dependent/create' 
                   element={ <PrivateRoute><DependentForm /></PrivateRoute> }
            />
            <Route 
                   path='/user/dependent' 
                   element={ <PrivateRoute><DependentList /></PrivateRoute> }
            />

            <Route 
                   path='/admin/product' 
                   element={ <PrivateRouteAdmin><Index /></PrivateRouteAdmin> }
            />
            <Route 
                   path='/admin/product/create' 
                   element={ <PrivateRouteAdmin><Form /></PrivateRouteAdmin> }
            />
            <Route 
                   path='/admin/product/:productId/edit' 
                   element={ <PrivateRouteAdmin><Edit /></PrivateRouteAdmin> }
            />
            <Route 
                   path='/admin/category' 
                   element={ <PrivateRouteAdmin><Category /></PrivateRouteAdmin> }
            />
            <Route 
                   path='/admin/category/create' 
                   element={ <PrivateRouteAdmin><FormCategory /></PrivateRouteAdmin> }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App
