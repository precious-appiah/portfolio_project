'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import axios from 'axios';

const formSchema = z
	.object({
		email: z
			.string()
			.min(2, { message: 'Kindly input a valid email' })
			.email('This is not a valid email'),
		username: z.string().min(3).max(20),
		password: z.string().min(8, { message: 'Password should be less than 8' }).max(20),
		confirmPassword: z.string().min(8, {}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export default function Registration() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		console.log(data);
		const res = await axios.post('', data);
		console.log(res?.data);
	};

	return (
		<section className='w-full flex justify-center align-center'>
			<div className='w-1/2 '>
				<h2 className='font-bold '> SIGN UP HERE</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='h-8 rounded' placeholder='username' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='h-8 rounded' placeholder='email' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='h-8 rounded' placeholder='password' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='h-8 rounded' placeholder='username' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button className='bg-blue-500 rounded w-full text-white' type='submit'>
							{' '}
							SIGN UP
						</Button>
					</form>
				</Form>
				{/* add already have account li*/}
				{/* <p className="text-sm">Already have an account</p> */}
			</div>
		</section>
	);
}
