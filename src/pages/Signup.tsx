'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z
	.object({
		email: z
			.string()
			.min(2, { message: 'Kindly input a valid email' })
			.email('This is not a valid email'),
		username: z.string().min(2, { message: 'Kindly input a valid email' }),
		password: z.string().min(4, { message: 'Password should be less than 4' }).max(20),
		confirmPassword: z.string().min(4, {}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export default function Signup() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	const navigate = useNavigate();
	const [disable, setDisable] = useState(false);
	const { toast } = useToast();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setDisable(true);
		console.log(data);
		try {
			const res = await axios.post('http://78.141.200.84:5000/signup', data);
			console.log(res.data);
			if (res?.data?.res == '00') {
				form.reset();
				setDisable(false);
				toast({
					description: 'success',
					style: {
						backgroundColor: '#28a745',
						padding: '15px',
						color: 'white',
						height: '60px',
						// width: '60px',
						borderRadius: '5px',
					},
				});
				setTimeout(() => navigate('/'), 5000);
			}
			if (res?.data?.res == '11') {
				toast({
					description: 'Failed to sign up',
					style: {
						backgroundColor: 'red',
						padding: '15px',
						color: 'white',
						height: '60px',
						// width: '60px',
						borderRadius: '5px',
					},
				});
				form.reset();
				setDisable(false);
			}
		} catch (error) {
			toast({
				description: 'An error occured',
				style: {
					backgroundColor: 'red',
					padding: '15px',
					color: 'white',
					height: '60px',
					// width: '60px',
					borderRadius: '5px',
				},
			});
			form.reset();
			setDisable(false);
		}
	};

	return (
		<section className='flex justify-center items-center mt-24'>
			<div className='w-1/3'>
				<h2 className='font-bold mb-10'> SIGN UP</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='h-8 rounded' placeholder='password' {...field} type='password'/>
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
										<Input
											className='h-8 rounded'
											placeholder='confirmPassword'
											{...field}
											type='password'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<button
							className='bg-gradient-to-r from-amber-500 to-orange-300 rounded w-full p-1 text-black'
							type='submit'
							disabled={disable}
						>
							{' '}
							SIGN UP
						</button>
					</form>
				</Form>
				{/* add NEW USERli*/}
				<p className='text-sm'>
					Already have an account?{' '}
					<i className='text-blue-500'>
						<Link to='/'>login</Link>
					</i>
				</p>
			</div>
		</section>
	);
}
