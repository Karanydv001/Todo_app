import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';


function App() {

const [todo, setTodo] = useState("")
const [todos, setTodos] = useState([])
const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)  
  }
}, [])


const saveToLS = (params) => {
   localStorage.setItem("todos",JSON.stringify(todos))
}

const toggleFinished = (e) => { 
  setshowfinished(!showfinished)
 }


const handleEdit=(e, id)=>{
  let t = todos.filter(i=>i.id===id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id !== id
 });
  setTodos(newTodos)
  saveToLS()
}
 
const handleDelete = (e, id)=>{
  let newTodos = todos.filter(item=>{
    return item.id !== id
 });
  setTodos(newTodos)
  saveToLS()
}
 
const handleAdd= ()=>{
   setTodos([...todos, {id : uuidv4(), todo, isCompleted: false}])
   setTodo("")
   
}
const handleChange = (e)=>{
   setTodo(e.target.value)
}

const handleCheckbox = (e) => {
  
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  saveToLS()
}


  return (
    <>
    <div className="bg-indigo-300 min-h-[100vh]">
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-indigo-400 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-sxl">iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-80 rounded-md text-black' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6'>Save</button>
        </div>
        <input className='my-5' onChange={toggleFinished} type="checkbox" checked={showfinished} />Show Finished 
          <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
        {todos.length===0 && <div className='m-5'>No Todos To Display</div> }
          {todos.map(item=>{
          return(showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2 my-3">
            <div className='flex gap-6'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="button flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-2'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)} }className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-2'>Delete</button>
          </div>
          </div>
          })}

        </div>
      </div>
      </div>
    </>
   
  )
}

export default App
