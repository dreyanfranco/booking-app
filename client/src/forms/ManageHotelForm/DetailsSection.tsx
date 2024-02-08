import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Name
        <input
          type="text"
          className="w-full rounded border py-1 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
    </div>
  )
}

export default DetailsSection
