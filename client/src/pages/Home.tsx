import { useQuery } from "react-query"

import LatestDestinationCard from "../components/LatestDestinationCard"
import * as apiClient from "../service/api-client"

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () => apiClient.fetchHotels())
  const { data: popularHotels } = useQuery("fetchPopularHotels", () =>
    apiClient.fetchPopularHotels(),
  )

  const topRowHotels = hotels?.slice(0, 2) || []
  const bottomRowHotels = hotels?.slice(2) || []

  if (!popularHotels) {
    return "Loading"
  }

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid animate-fade-up gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold">Most popular destinations</h2>
      <div className="carousel carousel-center h-[250px] space-x-1 rounded-box bg-orange-400 object-contain p-1">
        <div className="carousel-item">
          <img
            src={popularHotels[0].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={popularHotels[1].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={popularHotels[2].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={popularHotels[3].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={popularHotels[4].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={popularHotels[5].imageUrls[0]}
            alt={popularHotels[0].name}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
