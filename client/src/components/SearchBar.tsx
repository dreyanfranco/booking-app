import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"
import { useSearchContext } from "../context/SearchContext"

const SearchBar = () => {
  const navigate = useNavigate()
  const search = useSearchContext()

  const [destination, setDestination] = useState<string>(search.destination)
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    )
    navigate("/search")
  }

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 grid grid-cols-2 items-center gap-4 rounded bg-orange-400 p-3 shadow-md lg:grid-cols-5 2xl:grid-cols-5"
    >
      <div className="flex flex-1 flex-row items-center bg-white p-2">
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex gap-2 bg-white px-2 py-1">
        <label className="flex items-center">
          Adults:
          <input
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          showIcon
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none "
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          showIcon
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="h-full w-2/3 bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
          Search
        </button>
        <button className="h-full w-1/3 bg-red-600 p-2 text-xl font-bold text-white hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  )
}

export default SearchBar
