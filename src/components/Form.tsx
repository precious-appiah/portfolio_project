'use client';

import { useContext } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserContext } from '../contexts/UserContext';

const formSchema = z.object({
	task: z.string().min(1),
});

export default function TodoForm({ setTodo }) {
	const { user } = useContext(UserContext);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			task: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		console.log(data.task);
		const taskId = self.crypto.randomUUID();
		//make await call here
		const res = await axios.post('http://78.141.200.84:5000/create_task', {
			email: user?.email,
			task: data?.task,
			id: taskId,
			status: false,
		});
		console.log(res.data);

		// !TODO: show alert

		setTodo((items) => [...items, { task: data?.task, id: taskId, is_completed: false }]);
		form.reset();
	};

	return (
		<section className='w-full flex justify-center align-center  mt-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/3'>
					<div className='flex w-full justify-between'>
						<div className='w-5/6 mr-4'>
							<FormField
								control={form.control}
								name='task'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className=' h-8 rounded text-xs font-light text-gray-700'
												placeholder='write your task here'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className='w-1/6'>
							<button className='bg-amber-300 rounded w-full text-white h-8 mb-5' type='submit'>
								{' '}
								+
							</button>
						</div>
					</div>
				</form>
			</Form>
			{/* </div> */}
		</section>
	);
}
