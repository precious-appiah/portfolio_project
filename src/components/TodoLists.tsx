import Item from './Item'

interface Todo{
    todos:any
}
const TodoList :React.FC<Todo>=({ todos }) =>{
    return (
      <ol className="todo_list flex justify-center">
        {todos && todos.length > 0 ? (
          todos?.map((item:any, index:any) => <Item key={index} item={item} />)
        ) : (
          <p className='text-xs font-light text-gray-500'>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    );
  }
  export default TodoList;
