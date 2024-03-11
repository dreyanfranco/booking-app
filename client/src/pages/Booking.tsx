import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import BookingDetailSummary from "../components/BookingDetailSummary"
import { useSearchContext } from "../context/SearchContext"
import BookingForm from "../forms/BookingForm/BookingForm"
import * as apiClient from "../service/api-client"

const Booking = () => {
  const search = useSearchContext()
  const { hotelId } = useParams()

  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24)

      setNumberOfNights(Math.ceil(nights))
    }
  }, [search.checkIn, search.checkOut])

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    },
  )

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  )

  if (!hotel) {
    return <></>
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  )
}

export default Booking
