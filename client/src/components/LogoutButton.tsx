import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../context/AppContext"
import * as apiClient from "../service/api-client"

const LogoutButton = () => {
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: "Logged out", type: "SUCCESS" })
      // navigate("/")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
    >
      Logout
    </button>
  )
}

export default LogoutButton
