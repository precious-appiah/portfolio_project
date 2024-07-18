import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import Header from "@/components/Header";
// import Item from "@/components/Item";
// import TodoList from "@/components/TodoLists";
// import TodoHero from "@/components/TodoHero";

const formSchema = z.object({
	task: z.string().min(1),
});

export default function Scheduler() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			task: '',
		},
	});

	const onSubmitHandler = async (data: any) => {
		console.log(data);
	};
	return (
		<section className='w-full flex justify-center align-center'>
			<div className='w-1/2 '>
				<h2 className='font-bold '> SIGN UP HERE</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmitHandler)} className='space-y-8'>
						<FormField
							control={form.control}
							name='task'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className=' h-7 rounded'
											placeholder='Please write your task'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<button className='bg-blue-500 rounded w-full text-white' type='submit'>
							{' '}
							SIGN UP
						</button>
					</form>
				</Form>
			</div>
		</section>
	);
}
