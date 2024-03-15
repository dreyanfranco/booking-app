import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 rounded-lg bg-gray-300 p-6">
        <label className="w-full text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border px-3 py-2 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="w-full text-sm font-semibold">
          Children
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border px-3 py-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  )
}

export default GuestsSection
