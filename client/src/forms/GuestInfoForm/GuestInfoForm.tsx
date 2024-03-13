import ReactDatePicker from "react-datepicker"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import { useSearchContext } from "../../context/SearchContext"

type Props = {
  hotelId: string
  pricePerNight: number
}

type GuestInfoFormData = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}
const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext()
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  })

  const checkIn = watch("checkIn")
  const checkOut = watch("checkOut")

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    )
    navigate("/login", { state: { from: location } })
  }

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    )
    navigate(`/hotel/${hotelId}/booking`)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-blue-200 p-4">
      <h3 className="text-md font-bold">€{pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <ReactDatePicker
              required
              selected={checkIn}
              showIcon
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Check-in Date"
              className="min-w-full rounded-lg bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <ReactDatePicker
              required
              selected={checkOut}
              showIcon
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Check-in Date"
              className="min-w-full rounded-lg bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex justify-between gap-2 rounded-lg bg-white px-2 py-1">
            <label className="flex items-center">
              Adults:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="flex items-center">
              Children:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-sm font-semibold text-red-500">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="h-full rounded-lg bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
              Book Now
            </button>
          ) : (
            <button className="h-full rounded-lg bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm
