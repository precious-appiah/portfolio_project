import Item from './Item';

interface ITodo {
	todo: [];
	setTodo: unknown;
}
interface IItem {
	task: string;
	id: string;
	is_completed: boolean;
}
const TodoList: React.FC<ITodo> = ({ todo, setTodo }) => {
	return (
		<ol className='flex flex-col justify-center items-center '>
			{todo && todo.length > 0 ? (
				todo?.map((item: IItem, index: number) => (
					<Item setTodo={setTodo} key={index} item={item} />
				))
			) : (
				<p className='text-xs font-light text-gray-500'>
					Seems lonely in here, what are you up to?
				</p>
			)}
		</ol>
	);
};
export default TodoList;
