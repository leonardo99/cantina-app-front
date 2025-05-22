
import api from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await api.get('/auth/user');
            setUser(response.data);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        await api.post('/auth/login', { email, password });
        await fetchUser();
    };

}
