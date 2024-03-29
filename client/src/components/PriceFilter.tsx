type Props = {
  selectedPrice?: number
  onChange: (value?: number) => void
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md mb-2 font-semibold">Max Price</h4>
      <select
        className="w-full rounded-md border p-2"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined,
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PriceFilter
