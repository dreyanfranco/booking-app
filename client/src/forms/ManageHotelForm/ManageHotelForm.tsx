import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { HotelType } from "../../../../server/src/shared/types"
import DetailsSection from "./DetailsSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"
import TypeSection from "./TypeSection"

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageFiles: FileList
  imageUrls: string[]
}

type Props = {
  hotel?: HotelType
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    reset(hotel)
  }, [hotel, reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData()
    if (hotel) {
      formData.append("hotelId", hotel._id)
    }
    formData.append("name", formDataJson.name)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    formData.append("description", formDataJson.description)
    formData.append("type", formDataJson.type)
    formData.append("pricePerNight", formDataJson.pricePerNight.toString())
    formData.append("starRating", formDataJson.starRating.toString())
    formData.append("adultCount", formDataJson.adultCount.toString())
    formData.append("childCount", formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    // []
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url)
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile)
    })

    onSave(formData)
  })
  return (
    <FormProvider {...formMethods}>
      <form
        className="mx-auto flex flex-col gap-10 px-3 lg:w-3/4"
        onSubmit={onSubmit}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 disabled:bg-gray-500 lg:w-1/4 xl:w-1/4"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
