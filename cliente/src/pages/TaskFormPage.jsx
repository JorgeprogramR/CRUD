import {useForm} from 'react-hook-form'
import {useTasks} from '../context/TasksContext'
// useParams sirve para obtener un objeto, con los datos dinamicos que aparecen en la url o header
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react';

function TaskFormPage() {

  // setvalue nos permite establecer valores en los estados que reacthookform crea como en ...register
  const {register, handleSubmit, setValue} = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams(); 


  useEffect(()=>{
      const loadTask= async()=>{
        if (params.id) {
          const task = await getTask(params.id)
          console.log(task)
          setValue('title', task.title)
          setValue('description', task.description)
      }
    }


    loadTask()  
  }, [])

  const onSubmit = handleSubmit((data)=>{
    if (params.id){
      updateTask(params.id, data)
    }else{
      createTask(data);
    }
      navigate('/tasks')

  })

  return (
  <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    
    <div className=' bg-zinc-800 max-w-md w-full rounded-md p-10 '>

      <form onSubmit={onSubmit}>

        <input type="text" 
        placeholder="Titulo"
        {...register('title')}
        className='  w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
        autoFocus />

        <textarea  
        rows="3" 
        placeholder="Descripción"
        {...register('description')}
        className='  w-full bg-zinc-700 text-white px-4 py-2 rounded-md  my-2 '
        ></textarea>

        <button className='my-2 rounded-md py-2 px-3  bg-indigo-500 '>Guardar</button>

      </form>
    </div>
  </div>
  )
}

export default TaskFormPage




