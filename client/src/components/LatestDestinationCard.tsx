import { Link } from "react-router-dom"
import { HotelType } from "../../../server/src/shared/types"

type Props = {
  hotel: HotelType
}

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 w-full rounded-b-md bg-black bg-opacity-50 p-4">
        <span className="text-3xl font-bold tracking-tight text-white">
          {hotel.name}
        </span>
      </div>
    </Link>
  )
}

export default LatestDestinationCard
