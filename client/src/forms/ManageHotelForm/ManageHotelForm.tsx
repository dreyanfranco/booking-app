import { FormProvider, useForm } from "react-hook-form"
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
}

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>()
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
