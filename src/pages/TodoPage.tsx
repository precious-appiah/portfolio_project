import  { useState } from "react";

import Form from "@/components/Form";
import Header from "@/components/Header";
import TodoHero from "@/components/TodoHero";
import TodoList from "@/components/TodoLists";
function TodoPage() {
  const [todo, setTodo] = useState([
    {
      title: "Some first task",
      id: self.crypto.randomUUID(),
      is_completed: true,
    },
    {
      title: "Some second task",
      id: self.crypto.randomUUID(),
      is_completed: false,
    },
    {
      title: "Some third task",
      id: self.crypto.randomUUID(),
      is_completed: false,
    },
  ]);
  const completed = todo.filter(item=>item.is_completed=== true).length
  const total = todo.length


  return (
    <div className=" ">
      <Header />
      <TodoHero completed={completed} total={total} />
      <Form setTodo ={setTodo} />
      <TodoList todo={todo} setTodo={setTodo}/>
    </div>
  );
}
export default TodoPage;
