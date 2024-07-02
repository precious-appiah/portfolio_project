import Item from './Item'

interface Todo{
    todos:any
}
const TodoList :React.FC<Todo>=({ todos }) =>{
    return (
      <ol className="todo_list">
        {todos && todos.length > 0 ? (
          todos?.map((item:any, index:any) => <Item key={index} item={item} />)
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    );
  }
  export default TodoList;
