"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  task: z.string().min(1),
});

export default function TodoForm({setTodo}:any) {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.task);
    setTodo((items:any)=>[...items,{title: data?.task, id:self.crypto.randomUUID(), is_completed: false}])
    form.reset()
    

  };

  return (
    <section className="w-full flex justify-center align-center  mt-5">
      {/* <div className="w-1/3"> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/3"
        >
          <div className="flex w-full justify-between">
            <div className="w-5/6 mr-4">
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className=" h-8 rounded text-xs font-light text-gray-700"
                        placeholder="write your task here"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/7">
              <Button
                className="bg-amber-300 rounded w-full text-white h-8 mb-5"
                type="submit"
              >
                {" "}
                +
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {/* </div> */}
    </section>
  );
}
