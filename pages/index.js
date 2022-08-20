import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  
  useEffect(() => {
    const todoStr = localStorage.getItem('todo-react')
		setTodos(JSON.parse(todoStr))
	}, [])

	useEffect(() => {
		if (isFirstRender) {
			localStorage.setItem("todo-react", "[]");
      setIsFirstRender(false)
			return;
		}
		const todosStr = JSON.stringify(todos)
		localStorage.setItem('todo-react', todosStr)
	}, [todos])

  const deleteTodo = (idx) => {
    todos.splice(idx,1)
    const newTodos = [...todos]
    setTodos(newTodos)
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed
    setTodos([...todos])
  };

  const moveUp = (idx) => {
    if(idx === 0) return;
    const title = todos[idx].title
    const completed = todos[idx].completed

    todos[idx].title = todos[idx-1].title
    todos[idx].completed = todos[idx-1].completed

    todos[idx-1].title = title
    todos[idx-1].completed = completed
    setTodos([...todos])
  };

  const moveDown = (idx) => {
    if(idx === todos.length-1) return;
    const title = todos[idx].title
    const completed = todos[idx].completed

    todos[idx].title = todos[idx+1].title
    todos[idx].completed = todos[idx+1].completed

    todos[idx+1].title = title
    todos[idx+1].completed = completed
    setTodos([...todos])
  };

  const onKeyUpHandler = (e) => {
    if(e.key!=="Enter") return
    const newTodos = [{title: todoText, completed: false}, ...todos]
    setTodos(newTodos)
    setTodoText("")
  }

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={e=> setTodoText(e.target.value)}
          value={todoText}
          onKeyUp={onKeyUpHandler}
        />
        {/* Todos */}
        {todos.map((todo,i)=> (
          <Todo      
							title={todo.title}
							key={i}
							completed={todo.completed}			
							onDelete={() => { deleteTodo(i) }}					
							onMark={() => { markTodo(i) }}
              onMoveup={() => {moveUp(i)}}
              onMovedown={()=> {moveDown(i)}}
          />
        ))}
        
        
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">Pending ({todos.filter(x=>x.completed == false).length}) </span>
          <span className="text-success">Completed ({todos.filter(x=>x.completed == true).length})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Thadthon Prechamanasart 620610789
        </p>
      </div>
    </div>
  );
}
