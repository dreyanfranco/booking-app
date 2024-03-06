// import { useState } from "react"
// import { useQuery } from "react-query"
// import Pagination from "../components/Pagination"
// import SearchResultsCard from "../components/SearchResultsCard"
// import { useSearchContext } from "../context/SearchContext"
// import * as apiClient from "../service/api-client"

// const Search = () => {
//   const search = useSearchContext()
//   const [page, setPage] = useState<number>(1)

//   const searchParams = {
//     destination: search.destination,
//     checkIn: search.checkIn.toISOString(),
//     checkOut: search.checkOut.toISOString(),
//     adultCount: search.adultCount.toString(),
//     childCount: search.childCount.toString(),
//     page: page.toString(),
//   }

//   const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
//     apiClient.searchHotels(searchParams),
//   )

//   console.log(search.destination)
//   console.log(hotelData?.pagination.total)

//   return (
//     <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
//       <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
//         <div className="space-y-5">
//           <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
//             Filter by:
//           </h3>
//         </div>
//       </div>
//       <div className="flex flex-col gap-5">
//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold">
//             {hotelData?.pagination.total} Hotels found
//             {search.destination ? ` in ${search.destination}` : ""}
//           </span>
//         </div>
//         {hotelData?.data.map((hotel) => (
//           <SearchResultsCard key={hotel._id} hotel={hotel} />
//         ))}
//         <div>
//           <Pagination
//             page={hotelData?.pagination.page || 1}
//             pages={hotelData?.pagination.pages || 1}
//             onPageChange={(page) => setPage(page)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Search

import { useState } from "react"
import { useQuery } from "react-query"
import Pagination from "../components/Pagination"
import SearchResultsCard from "../components/SearchResultsCard"
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from "../service/api-client"

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  }

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams),
  )

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
            Filter by:
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {hotelData?.data.map((hotel) => <SearchResultsCard hotel={hotel} />)}
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
