// importamos useform para crear la funcion onsubmit
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

function LoginPage() {
  // esto es lo que nos trae useform
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {signin, errors: signinErrors, isAuthenticated} = useAuth();
  // creamos la funcion onsubmit
  // esto nos retorna los datos
  const onSubmit = handleSubmit(data => {
    signin(data)
  });

  const navigate = useNavigate()

//creamos el cambio de pagina despues de estar logueado

  useEffect(()=>{
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  // retornamos el formulario
  return (
    <div className=" flex h-[calc(100vh-100px)] items-center justify-center">
      <div className=" bg-zinc-800 max-w-md  w-full p-10 rounded-md">
      {
        signinErrors.map((error, i) =>(
          <div className=' bg-red-500 p-2 text-white text-center my-2 ' key={i}>
            {error}
          </div>
        ))
      }
      <h1 className="text-2xl font-bold text-center">INICIAR SESIÓN</h1>
      <form onSubmit={onSubmit}>
        <input type="email" {
          ...register('email', { required: true })
        } className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo Electrónico' />
        {errors.email && <p className='text-red-500'>El correo es requerido</p>}

        <input type="password" {
          ...register('password', { required: true })
        } className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
        {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}

        <button type='submit' className=' bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md '>Ingresar</button>
      </form>
      <p className=" flex gap-x-2  justify-between text-sky-900  ">¿No tienes una cuenta?
        <Link to ='/register' className=" text-sky-500 ">Registrarse</Link>
      </p> 
      </div>

    </div>
  )
}

export default LoginPage