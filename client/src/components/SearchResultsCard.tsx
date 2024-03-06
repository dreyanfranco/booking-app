import { Link } from "react-router-dom"
import { HotelType } from "../../../server/src/shared/types"

type Props = {
  hotel: HotelType
}

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="grid grid-cols-1 gap-8 rounded-lg border border-slate-300 p-8 xl:grid-cols-[2fr_3fr]"
    >
      <div className="h-[300px] w-full">
        <img
          src={hotel.imageUrls[0]}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <h2 className="cursor-pointer text-2xl font-bold">{hotel.name}</h2>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap ">
          <div className="flex items-center gap-1">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="whitespace-nowrap rounded-lg bg-slate-300 p-2 text-xs font-bold"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-lg bg-slate-300 p-2 font-bold">
              €{hotel.pricePerNight} per night
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultsCard
