import { useState } from "react"
import { useQuery } from "react-query"
import FacilitiesFilter from "../components/FacilitiesFilter"
import HotelTypesFilter from "../components/HotelTypesFilter"
import Pagination from "../components/Pagination"
import PriceFilter from "../components/PriceFilter"
import SearchResultsCard from "../components/SearchResultsCard"
import StarRatingFilter from "../components/StarRatingFilter"
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from "../service/api-client"

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
  const [sortOption, setSortOption] = useState<string>("")

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  }

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams),
  )

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating),
    )
  }

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const hotelType = event.target.value

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType),
    )
  }

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility),
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      <div className="top-10 hidden h-fit rounded-lg border border-slate-300 p-5 lg:sticky lg:block">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-xl font-bold">
          {hotelData?.pagination.total} Hotels found
          {search.destination ? ` in ${search.destination}` : ""}
        </span>
        <div className="flex items-center justify-between lg:justify-end">
          <button
            className="btn btn-md lg:hidden xl:hidden"
            onClick={() => {
              const filterModal = document.getElementById("filterModal")
              if (filterModal instanceof HTMLDialogElement) {
                filterModal.showModal()
              }
            }}
          >
            Filter by:
          </button>
          <dialog id="filterModal" className="modal">
            <div className="modal-box">
              <div className="space-y-5">
                <StarRatingFilter
                  selectedStars={selectedStars}
                  onChange={handleStarsChange}
                />
                <HotelTypesFilter
                  selectedHotelTypes={selectedHotelTypes}
                  onChange={handleHotelTypeChange}
                />
                <FacilitiesFilter
                  selectedFacilities={selectedFacilities}
                  onChange={handleFacilityChange}
                />
                <PriceFilter
                  selectedPrice={selectedPrice}
                  onChange={(value?: number) => setSelectedPrice(value)}
                />
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="select select-bordered"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard key={hotel._id} hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
