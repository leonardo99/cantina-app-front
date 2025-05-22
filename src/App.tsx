import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/Auth/AuthContext';
import Login from '@/Pages/Auth/Login';

function App() {
  
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Login /> }/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App
