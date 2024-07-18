import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { VscCircle, VscCircleFilled } from 'react-icons/vsc';
import { UserContext } from '../contexts/UserContext';

interface IItem {
	task: string;
	id: string;
	is_completed: boolean;
}
interface HeroProps {
	item: IItem;
	setTodo;
}

const Item: React.FC<HeroProps> = ({ item, setTodo }) => {
	const [editing, setEditing] = useState(false);
	const { user } = useContext(UserContext);
	const inputRef = useRef(null);

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
			// position the cursor at the end of the text
			inputRef.current.setSelectionRange(
				inputRef.current.value.length,
				inputRef.current.value.length
			);
		}
	}, [editing]);

	const handleInputChange = (e) => {
		setTodo((prevTodos: []) =>
			prevTodos.map((todo: IItem) =>
				todo.id === item.id ? { ...todo, task: e.target.value } : todo
			)
		);
	};

	const handleEdit = () => {
		setEditing(true);
	};

	const handleInputSubmit = (event) => {
		event.preventDefault();
		setEditing(false);
	};
	const handleInputBlur = () => {
		setEditing(false);
	};
	
	const completeTodo = async () => {
		const res = await axios.put('http://78.141.200.84:5000/update_task', {
			email: user?.email,
			id: item?.id,
			task: item?.task,
			status: !item?.is_completed,
		});
		console.log(res?.data?.message);
		setTodo((prevTodos: []) =>
			prevTodos.map((todo: IItem) =>
				todo.id === item.id ? { ...todo, is_completed: !todo.is_completed } : todo
			)
		);
	};

	const handleDelete = async () => {
		// !TODO: add codes and loading
		const res = await axios.delete('http://78.141.200.84:5000/delete', {
			data: {
				email: user?.email,
				id: item?.id,
			},
		});

		console.log(res);
		setTodo((prevTodos: []) => prevTodos.filter((todo: IItem) => todo.id !== item.id));
	};
	return (
		<li
			id={item?.id}
			className='flex justify-between w-1/3 border border-black-200 p-1 m-2 rounded'
		>
			{editing ? (
				<form className='edit-form' onSubmit={handleInputSubmit}>
					<label htmlFor='edit-todo'>
						<input
							ref={inputRef}
							type='text'
							name='edit-todo'
							id='edit-todo'
							defaultValue={item?.task}
							onBlur={handleInputBlur}
							onChange={handleInputChange}
						/>
					</label>
				</form>
			) : (
				<>
					<button className='flex p-1' onClick={completeTodo}>
						{item?.is_completed ? (
							<VscCircleFilled className='w-9' />
						) : (
							<VscCircle className='w-9' />
						)}
					</button>
					<p
						className='text-xs'
						style={item.is_completed ? { textDecoration: 'line-through' } : {}}
					>
						{item?.task}
					</p>
					<div className=''>
						<button onClick={handleEdit}>
							<FaRegEdit />
						</button>
						<button onClick={handleDelete}>
							<MdDelete />
						</button>
					</div>
				</>
			)}
		</li>
	);
};

export default Item;
