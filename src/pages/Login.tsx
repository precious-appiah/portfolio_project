'use client';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { UserContext } from '../contexts/UserContext';

// import Signup from './Signup';

import axios from 'axios';

const formSchema = z.object({
	email: z
		.string()
		.min(2, { message: 'Kindly input a valid email' })
		.email('This is not a valid email'),
	password: z.string(),
});

export default function Login() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { toast } = useToast();
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const [disable, setDisable] = useState(false);
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setDisable(true);
		try {
			console.log(data);
			const res = await axios.post('http://78.141.200.84:5000/login', data);
			console.log(res?.data);

			if (res?.data?.res == '00') {
				setUser(res?.data?.message);
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
				setTimeout(() => navigate('/main-page'), 5000);
			}
			if (res?.data?.res == '11') {
				toast({
					description: 'Failed to login',
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
			console.log(error?.message || error);
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
		<section className='w-full flex justify-center items-center mt-24'>
			<div className='w-1/3 '>
				<h2 className='font-bold mb-10'>LOGIN</h2>
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
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className='h-8 rounded'
											placeholder='password'
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
							LOGIN
						</button>
					</form>
				</Form>
				{/* add NEW USERli*/}
				<p className='text-sm'>
					Not registered yet?{' '}
					<i className='text-blue-500'>
						<Link to='/signup'>sign up</Link>
					</i>
				</p>
			</div>
		</section>
	);
}
