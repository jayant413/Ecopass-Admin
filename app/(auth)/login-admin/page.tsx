"use client";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import api from "@/helpers/api";

const formSchema = z.object({
  email_id: z.string().min(5),
  password: z.string().min(3),
});

const LoginAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_id: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/admin/login", {
        email_id: values.email_id,
        password: values.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        toast({ title: "Logged in successfully" });
        router.push("/");
      } else toast({ title: "Something went wrong" });
      //
    } catch (error: any) {
      //
      if (error.response.status == 404) {
        toast({ title: "Not Registered Please Register First" });
        router.push("/register-admin");
      } else if (error.response.status == 401) {
        toast({ title: "Password is incorrect" });
      } else toast({ title: "Something went wrong" });
    }
  };

  return (
    <div className="bg-white py-5 px-5 rounded-md">
      <Form {...form}>
        <h4 className="font-bold text-xl text-gray-700 mb-4">Admin Login</h4>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Email ID</FormLabel>
                <FormControl>
                  <Input placeholder="Email ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-3 ">
            Submit
          </Button>
          <a href="/register-admin">Create an account.</a>
        </form>
      </Form>
    </div>
  );
};

export default LoginAdmin;
