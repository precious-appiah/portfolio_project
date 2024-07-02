import Form from "@/components/Form";
import Header from "@/components/Header";
import TodoHero from "@/components/TodoHero";
import TodoList from "@/components/TodoLists";
function TodoPage() {
  return (
    <div className="wrapper">
      <Header />
      <TodoHero completed={0} total={0} />
      <Form />
      <TodoList todos={[]} />
    </div>
  );
}
export default TodoPage;
