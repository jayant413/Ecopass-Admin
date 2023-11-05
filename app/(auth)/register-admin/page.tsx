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
  name: z.string().min(2).max(50),
  email_id: z.string().min(5),
  mobile_number: z.string().min(9).max(11),
  aadhaar_no: z.string().min(11).max(13),
  password: z.string().min(3),
  confirm_password: z.string().min(3),
});

const RegisterAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email_id: "",
      mobile_number: undefined,
      aadhaar_no: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.password != values.confirm_password) {
        toast({ title: "Password is not confirmed" });
        return;
      }
      const response = await api.post("/admin/register", {
        name: values.name,
        email_id: values.email_id,
        mobile_number: values.mobile_number,
        aadhaar_no: values.aadhaar_no,
        password: values.password,
      });

      if (response.data.success) router.push("/login-admin");
      else toast({ title: "Something went wrong" });
      //
    } catch (error: any) {
      //
      if (error.response.status == 409) {
        toast({ title: "Already Registered Please Login" });
        router.push("/login-admin");
      } else toast({ title: "Something went wrong" });
    }
  };

  return (
    <div className="bg-white py-5 px-5 rounded-md">
      <Form {...form}>
        <h4 className="font-bold text-xl text-gray-700 mb-4">Register Admin</h4>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid md:grid-cols-2 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Mobile Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Mobile Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aadhaar_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Aadhaar Number</FormLabel>
                <FormControl>
                  <Input placeholder="Aadhaar Number" {...field} />
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
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 ">
            Submit
          </Button>
          <a href="/login-admin">Already have an account?</a>
        </form>
      </Form>
    </div>
  );
};

export default RegisterAdmin;
