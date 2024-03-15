import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>()
  const typeWatch = watch("type")
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-3 gap-2 text-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer rounded-full border border-blue-500 bg-white px-4 py-2 text-sm font-semibold text-blue-500"
                : "cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <span className="">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )}
    </div>
  )
}

export default TypeSection
