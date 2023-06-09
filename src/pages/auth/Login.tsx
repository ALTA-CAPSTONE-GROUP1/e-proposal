import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";

const schema = z.object({
  id: z.string().min(1, { message: "Users ID is required" }),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setCookie] = useCookies(["token", "user_position", "username"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  function handleDataUser(cook: string) {
    // const url = "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
    // axios({
    //   method: "get",
    //   url: `${url}/profile`,
    // })
    axios
      .get(`profile`, {
        headers: {
          Authorization: `Bearer ${cook}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        const name = data.name;
        setCookie("username", name);
      })
      .catch((er) => {
        const { message } = er.response;
        console.log(message);
        setCookie("username", "admin");
      });
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("login", data)
      .then((res) => {
        const { data, message } = res.data;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("token", data.token, { path: "/" });
            setCookie("user_position", data.role, { path: "/" });
            handleDataUser(data.token);
            if (data.role === "Admin" || data.role === "admin") {
              navigate("/admin"); // jika user adalah admin, arahkan ke halaman admin
            } else {
              navigate("/user"); // jika user bukan admin, arahkan ke halaman user
            }
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1163675.jpg")`,
      }}
    >
      <div className="flex hero-overlay bg-opacity-60 justify-center items-center ">
        <form
          className="flex flex-col m-6 p-8 bg-white rounded-md w-full md:w-fit h-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img src="/images/Logo2.png" alt="" />
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Login</h3>
            <h3 className="text-sm">
              Welcome back. Enter your credentials to access your account
            </h3>
            <div className="mt-5 w-full">
              <label htmlFor="id" className="font-semibold text-md text-black">
                User ID
              </label>
              <Input
                register={register}
                name="id"
                id="input-user-id"
                placeholder="Enter Your ID"
                error={errors.id?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label
                htmlFor="password"
                className="font-semibold text-md text-black"
              >
                Password
              </label>
              <Input
                register={register}
                name="password"
                placeholder="Enter Your Password"
                id="input-user-id"
                type="password"
                error={errors.password?.message}
              />
            </div>
            <div className="mt-5">
              <RedButton
                label="Login"
                id="button-login"
                type="submit"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col mt-5 md:justify-center md:items-center text-md text-black">
              <p>
                Don't have an Account? Contanct{" "}
                <Link
                  to="/"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="contact-admin"
                >
                  Your Admin
                </Link>
              </p>
              <p>
                Check Users Sign Submission?
                <Link
                  to="/sign-id"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="sign-id"
                >
                  Sign ID
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
