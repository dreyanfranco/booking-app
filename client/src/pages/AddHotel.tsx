import { useMutation } from "react-query"
import { useAppContext } from "../context/AppContext"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from "../service/api-client"

const AddHotel = () => {
  const { showToast } = useAppContext()
  const { mutate, isLoading } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" })
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel
