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
      className="-mt-8 grid grid-cols-1 gap-2 rounded-lg bg-orange-400 p-1 shadow-md lg:grid-cols-5 2xl:grid-cols-5"
    >
      <div className="flex flex-1 flex-row items-center rounded-lg bg-white p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
        <input
          placeholder="Where are you going?"
          className="text-md w-full px-1 focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex justify-around rounded-lg bg-white px-2 py-1">
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

      <div className="flex items-center">
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
          showDisabledMonthNavigation
          placeholderText="Check-in Date"
          className="min-w-full rounded-lg bg-white focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex items-center">
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
          className="min-w-full rounded-lg bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex justify-around gap-2 ">
        <button className="h-full w-full rounded-lg bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
