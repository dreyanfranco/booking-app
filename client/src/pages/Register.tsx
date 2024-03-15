import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import * as apiClient from "../service/api-client"

export type RegisterFormDataProps = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDataProps>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Succesful!", type: "SUCCESS" })
      await queryClient.invalidateQueries("validateToken")
      navigate("/")
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
      <h2 className="mb-3 text-3xl font-bold">Create an account</h2>
      <form onSubmit={onSubmit} className="max-w-sm md:w-1/3">
        <div className="mb-4 flex gap-2">
          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="John"
              className="rounded border py-1 pl-2 font-normal"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="Doe"
              className="rounded border py-1 pl-2 font-normal"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <input
          type="email"
          placeholder="johndoe@email.com"
          className="w-full rounded border py-1 pl-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          className="mt-4 w-full rounded border border-solid border-gray-300 py-1 pl-2"
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
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-4 w-full rounded border py-1 pl-2"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required"
              } else if (watch("password") !== val) {
                return "Passwords do not match"
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        <div className="text-center md:text-left">
          <button
            className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="mt-4 text-center text-sm font-semibold text-slate-500 md:text-left">
          Already have an account?{" "}
          <Link
            className="text-blue-500 underline hover:underline hover:underline-offset-4"
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </section>
    // <form className="flex flex-col gap-5" onSubmit={onSubmit}>
    //   <h2 className="text-3xl font-bold">Create an Account</h2>
    //   <div className="flex flex-col gap-5 md:flex-row">
    //     <label className="flex-1 text-sm font-bold text-gray-700">
    //       First Name
    //       <input
    //         type="text"
    //         className="w-full rounded border py-1 font-normal"
    //         {...register("firstName", { required: "This field is required" })}
    //       />
    //       {errors.firstName && (
    //         <span className="text-red-500">{errors.firstName.message}</span>
    //       )}
    //     </label>
    //     <label className="flex-1 text-sm font-bold text-gray-700">
    //       Last Name
    //       <input
    //         type="text"
    //         className="w-full rounded border py-1 font-normal"
    //         {...register("lastName", { required: "This field is required" })}
    //       />
    //       {errors.lastName && (
    //         <span className="text-red-500">{errors.lastName.message}</span>
    //       )}
    //     </label>
    //   </div>
    //   <label className="flex-1 text-sm font-bold text-gray-700">
    //     Email
    //     <input
    //       type="email"
    //       className="w-full rounded border py-1 font-normal"
    //       {...register("email", { required: "This field is required" })}
    //     />
    //     {errors.email && (
    //       <span className="text-red-500">{errors.email.message}</span>
    //     )}
    //   </label>
    // <label className="flex-1 text-sm font-bold text-gray-700">
    //   Password
    //   <input
    //     type="password"
    //     className="w-full rounded border py-1 font-normal"
    //     {...register("password", {
    //       required: "This field is required",
    //       minLength: {
    //         value: 4,
    //         message: "Password must be at least 4 characters",
    //       },
    //     })}
    //   />
    //   {errors.password && (
    //     <span className="text-red-500">{errors.password.message}</span>
    //   )}
    // </label>
    // <label className="flex-1 text-sm font-bold text-gray-700">

    // </label>
    //   <span>
    //     Already have an account?{" "}
    //     <Link
    //       className="text-blue-500 underline hover:underline hover:underline-offset-4"
    //       to="/login"
    //     >
    //       Login
    //     </Link>
    //     <button
    //       type="submit"
    //       className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
    //     >
    //       Register
    //     </button>
    //   </span>
    // </form>
  )
}

export default Register
