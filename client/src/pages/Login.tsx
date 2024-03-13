import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import * as apiClient from "../service/api-client"

export type LoginFormDataProps = {
  email: string
  password: string
}

const Login = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const location = useLocation()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormDataProps>()

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Logged in succesfully", type: "SUCCESS" })
      await queryClient.invalidateQueries("validateToken")

      navigate(location.state?.from?.pathname || "/")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })
  return (
    <section className="mx-5 flex flex-col items-center justify-center">
      <div className="max-w-sm md:w-1/3">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <form onSubmit={onSubmit} className="max-w-sm md:w-1/3">
        <input
          className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
          type="text"
          placeholder="Email Address"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-400">{errors.email.message}</span>
        )}
        <input
          className="mt-4 w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-400">{errors.password.message}</span>
        )}
        <div className="text-center md:text-left">
          <button
            className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center text-sm font-semibold text-slate-500 md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            className="text-blue-500 underline hover:underline hover:underline-offset-4"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Login
