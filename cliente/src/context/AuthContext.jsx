// realizamos las importaciones de create, use, usecontext que son necesarias para crear un contexto y manejar el estado dentro del componente funcional
import { createContext, useState, useContext, useEffect } from 'react';
// importamos la funcion que ayuda a enviar las solicitud de registro al servidor 
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js'

// 
import Cookies from 'js-cookie'

// creamos el contexto y lo exportamos
export const AuthContext = createContext();

// definimos un hook llamado useAuth que emplea useContext para acceder al contexto de autentificacion
export const useAuth = () => {
    const context = useContext(AuthContext)
// si el contexto no esta disponible significa que use auth se esta utilizando fuera del proveedor de autenticacion (authProvider)
    if (!context) {
        throw new Error('userAuth must be used within an AuthProvider');
    }
    return context;
}

// definimos un componente funcional authprovider 
export const AuthProvider = ({ children }) => {
// usamos dos estados dentro del componente user e isAuthenticated para almacenar la informacion del usuario autenticado
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

// aca tomamos y  le damos un estado null mientras que no tenga error
    const [errors, setErrors] = useState([]);


// Creamos el estado de carga
const [loading, setLoading] = useState(true)

// definimos la funcion signup para enviar una solicitud de registro al servidor
    const signup = async (user) => {
        try {
// esperamos que registerRequest nos de una respuesta
// si tenemos exito actualizamos el estado del usuario con los datos devueltos por la solicitud y establecemos el estado isAuthenticate cambiamos el estado a true 
            const res = await registerRequest(user);
            setUser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
        // si hay un error nos trae el error que esta en .response.data
            // console.log(error.response.data)
            setErrors(error.response.data)
        }
    };
// creamos la autenticacion del login 

    const signin = async (user) =>{
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true);
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

// --------creando el logout-----------

const logout = ()=>{
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
}


// ------------------------------------------------------------------------------
useEffect(()=> {
    async function checkLogin (){
            
        const cookies =Cookies.get();
        if (!cookies.token){
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
        }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data); 
                setLoading(false);         
                    
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        
    }
    checkLogin();
},[])

//contador para quitar los mensajes de error
useEffect(()=>{
    if(errors.length > 0){
        const timer = setTimeout(() => {
            // despues de los 5 segundos limpiamos errors
           setErrors([]) 
        }, 5000);
        // si el componente no se esta usando, destruimos el timeout
        return ()=> clearTimeout(timer);
    }
}, [errors])
    
// 
    return (
        // el componente authprovider utiliza authContext.provider para envolver su contenido ('children). Dentro del proveedor se proporcionan los valores signup, user e isAuthenticate como un objeto de valor, esto permite que los componentes secundarios accedan a estos valores utilizando el hook 'useAuth'
        <AuthContext.Provider value={{
            signup, signin, logout, user, isAuthenticated, errors,loading
        }}>
            {children}
        </AuthContext.Provider>
    )
} 

































// revisar el min 3:30:00
