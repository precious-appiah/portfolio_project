import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

import Form from '@/components/Form';
import Header from '@/components/Header';
import TodoHero from '@/components/TodoHero';
import TodoList from '@/components/TodoLists';
interface ITodo {
	task: string;
	id: string;
	is_completed: boolean;
}
function TodoPage() {
	const [todo, setTodo] = useState([]);
	const { user } = useContext(UserContext);
	// {
	// 		title: 'Some first task',
	// 		id: self.crypto.randomUUID(),
	// 		is_completed: true,
	// 	},
	// 	{
	// 		title: 'Some second task',
	// 		id: self.crypto.randomUUID(),
	// 		is_completed: false,
	// 	},
	// 	{
	// 		title: 'Some third task',
	// 		id: self.crypto.randomUUID(),
	// 		is_completed: false,
	// 	},

	useEffect(() => {
		const loadTodo = async () => {
			const result = await axios.post('http://78.141.200.84:5000/get_tasks', {
				email: user?.email,
			});
			console.log(result?.data);
			setTodo(result?.data?.message);
		};
		loadTodo();
	}, []);
	const completed = todo.filter((item: ITodo) => item.is_completed === true).length;
	const total = todo.length;

	return (
		<div className=' '>
			<Header />
			<TodoHero completed={completed} total={total} />
			<Form setTodo={setTodo} />
			<TodoList todo={todo} setTodo={setTodo} />
		</div>
	);
}
export default TodoPage;
