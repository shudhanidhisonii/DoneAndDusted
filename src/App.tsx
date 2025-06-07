import AddToDo from "./components/AddTodo"

import Navbar from "./components/navbar"
import Todos from "./components/todos"
import "./App.css"

const App = () => {
  return (
   <main>
      <h1>Done & Dusted </h1>
      <Navbar />
      <AddToDo />
      <Todos />
   </main>
  )
}

export default App