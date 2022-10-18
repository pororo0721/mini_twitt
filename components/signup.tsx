import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface CreateAccountForm {
  email: string;
  password: string;
}
interface CreateAccountResponse {
  ok: boolean;
  error?: string;
}

export default function Signup() {
  const router = useRouter();
  const [createAccount, { data, loading }] = useMutation<CreateAccountResponse>(
    "/api/signup"
  );
  const { register, handleSubmit, getValues } = useForm<CreateAccountForm>();
  const onValid = (data: CreateAccountForm) => {
    if (loading) return;
    createAccount({ ...data });
  };
  useEffect(() => {
    if (data?.ok) {
      router.push({
        pathname: "/",
        query: {
          username: getValues("email"),
          password: getValues("password")
        }
      });
    }
    if (data?.error) {
      alert(data.error);
    }
  }, [data, router]);

  const externalImage =
    "https://images.unsplash.com/photo-1618243615611-f64ebcb16f36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  return (
    <div className="flex min-h-screen bg-white">
      <div
        className="w-1/2 bg-cover md:block hidden"
        style={{ backgroundImage: `url(${externalImage})` }}
      ></div>

      <div className="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
        <div className="text-left p-0 font-sans">
          <h1 className=" text-gray-800 text-3xl font-medium">
            Create an account for free
          </h1>
          <h3 className="p-1 text-gray-700">
            Free forever. No payment needed.
          </h3>
        </div>
        <form onSubmit={handleSubmit(onValid)} action="#" className="p-0">
          <div className="mt-5">
            <label htmlFor="email" className="sc-bqyKva ePvcBv">
              Email
            </label>
            <input
              type="text"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
              placeholder="Email"
              {...register("email", { required: "Write your email please." })}
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
              placeholder="Password"
              {...register("password", {
                required: "Password has to be more than 5 chars."
              })}
            />
          </div>

          <div className="mt-10">
            <input
              type="submit"
              value="Sign up with email"
              className="py-3 bg-blue-500  text-white w-full rounded hover:bg-blue-400 "
            />
          </div>
        </form>
        <a className="" href="/" data-test="Link">
          <span className="block  p-5 text-center text-gray-800  text-xs ">
            Already have an account?
          </span>
        </a>
      </div>
    </div>
  );
}
