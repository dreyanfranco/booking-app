import { useEffect } from "react"

type ToastProps = {
  message: string
  type: "SUCCESS" | "ERROR"
  onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-200  border-green-700 border-2 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-200 border-red-700 border-2 text-white max-w-md"

  return (
    <div className={styles}>
      <div className="flex items-center justify-center ">
        <span className="text-slate-900">{message}</span>
      </div>
    </div>
  )
}

export default Toast
