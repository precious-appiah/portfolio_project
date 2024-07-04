import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VscCircle, VscCircleFilled} from "react-icons/vsc";

interface HeroProps {
  item: any;
  setTodo: any;
}
const Item: React.FC<HeroProps> = ({ item, setTodo }) => {
  const completeTodo = () => {
    setTodo((prevTodos: any) =>
      prevTodos.map((todo: any) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  const handleDelete = () => {
    setTodo((prevTodos:any) => prevTodos.filter((todo:any) => todo.id !== item.id));
  };
  return (
    <li
      id={item?.id}
      className="flex justify-between w-1/3 border border-black-200 p-1 m-2 rounded"
    >
      <button className="flex p-1" onClick={completeTodo}>
        {item?.is_completed ?<VscCircleFilled className="w-9" /> : <VscCircle className="w-9" /> }
        
      </button>
      <p
        className="text-xs"
        style={item.is_completed ? { textDecoration: "line-through" } : {}}
      >
        {item?.title}
      </p>
      <div className="">
        <button>
          <FaRegEdit />
        </button>
        <button onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Item;
