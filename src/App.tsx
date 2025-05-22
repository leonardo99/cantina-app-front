import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/Auth/AuthContext';
import Login from '@/Pages/Auth/Login';
import Home from '@/Pages/Client/Home';
import PrivateRoute from '@/Pages/Auth/PrivateRoutes';
import PublicRoute from '@/Pages/Auth/PublicRoutes';

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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App
