"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z
      .string()
      .min(2, { message: "Kindly input a valid email" })
      .email("This is not a valid email"),
    password: z
      .string()
  })
  

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     
      email: "",
      password: "",
    
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <section className="w-full flex justify-center align-center">
      <div className="w-1/2 ">
        <h2 className="font-bold mb-10"> LOGIN</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-8 rounded"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-8 rounded"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        
            <Button
              className="bg-blue-500 rounded w-full text-white-500"
              type="submit"
            >
              {" "}
              LOGIN
            </Button>
          </form>
        </Form>
        {/* add NEW USERli*/}
        {/* <p className="text-sm">p> */}
      </div>
    </section>
  );
}

