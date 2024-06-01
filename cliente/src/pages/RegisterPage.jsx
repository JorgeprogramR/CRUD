// para validar la informacion que envia el frontend podemos usar unos modulos que lo hacen automaticamente que se llama react hoock form
// importamos de react hook form el modulo useForm
import { useForm } from 'react-hook-form'
// contexto de autenticacion
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom'


// importamos la conexion al back


// creamos la funcion register page
function RegisterPage() {
  // las validaciones se colocaran directamente dentro del elemento a emplear, en este caso es en los input 

// gestionamos el estado del formulario y sus validaciones con el hook useForm, este nos devuelve dos metodos 
  const { register, handleSubmit, formState:{errors}} = useForm()
// con useAuth obtenemos la funcion signup y el estado isAuthenticate
  const {signup, isAuthenticated, errors: RegisterErrors} = useAuth();
  // hook para obtener una funcion de navegacion que se utiliza para redirigir al usuario a otra pag
  const navigate = useNavigate();

// empleamos useEffect para realizar efectos secundarios despues de que el componente se haya renderizado 
  useEffect(()=>{
// si el usuario es autenticado nos redirige a /tasks y este efecto se activa cuando el usuario es autenticado 
    if(isAuthenticated) navigate('/tasks');
  },[isAuthenticated])
  // definimos la funcion onsubmit que se llamara cuando se envie el formulario (llamamos a signup con los valores del formulario)
  const onSubmit = handleSubmit(async values => {
    signup(values)
  })
// renderizamos el formulario con tres campos de entrada 
  return (
   <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    
     <div className=' bg-zinc-800 max-w-md  w-full p-10 rounded-md ' >
     <h1 className="text-2xl font-bold text-center">REGISTRO</h1>
      {
        RegisterErrors.map((error, i) =>(
          <div className=' bg-red-500 p-2 text-white text-center my-2 ' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input type="text" {
          ...register('username', { required: true })
        } className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre del usuario' />
        {errors.username &&<p className='text-red-500'>El nombre del usuario es requerido</p>}
        
        <input type="email" {
          ...register('email', { required: true })
        } className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo electrónico' />
        {errors.email &&<p className='text-red-500'>El correo electrónico es requerido</p>}
        
        <input type="password" {
          ...register('password', { required: true })
        } className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
        {errors.password &&<p className='text-red-500'>La contraseña es requerida</p>}
    
        <button type='submit' className='  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md my-5' >Crear usuario</button>
        <p className=" flex gap-x-2  justify-between text-sky-900  ">¿Ya tienes una cuenta?
        <Link to ='/login' className=" text-sky-500 ">Iniciar sesión</Link>
      </p> 
      </form>
    </div>
   </div>
  )
}

export default RegisterPage