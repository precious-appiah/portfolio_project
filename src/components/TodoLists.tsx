import Item from "./Item";

interface Todo {
  todo: any;
  setTodo:any
}
const TodoList: React.FC<Todo> = ({ todo , setTodo}) => {
  return (
    <ol className="flex flex-col justify-center items-center ">
      {todo && todo.length > 0 ? (
        todo?.map((item: any, index: any) => <Item setTodo ={setTodo} key={index} item={item} />)
      ) : (
        <p className="text-xs font-light text-gray-500">
          Seems lonely in here, what are you up to?
        </p>
      )}
    </ol>
  );
};
export default TodoList;
