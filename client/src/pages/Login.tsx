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
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full rounded border py-1 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Login
        </button>
      </span>
    </form>
  )
}

export default Login
