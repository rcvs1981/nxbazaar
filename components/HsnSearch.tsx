"use client"

import { useState, ChangeEvent } from "react"

type HsnCode = {
  id: string
  code: string
  description: string
}

type Props = {
  setValue: (name: "hsnCodeId", value: string) => void
}

export default function HsnSearch({ setValue }: Props) {

  const [results, setResults] = useState<HsnCode[]>([])
  const [query, setQuery] = useState<string>("")

  async function search(value: string): Promise<void> {

    setQuery(value)

    if (!value) {
      setResults([])
      return
    }

    const res = await fetch(`/api/hsn/search?q=${value}`)
    const data: HsnCode[] = await res.json()

    setResults(data)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    search(e.target.value)
  }

  return (
    <div className="space-y-2">

      <input
        type="text"
        value={query}
        placeholder="Search HSN Code"
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />

      {results.length > 0 && (
        <div className="border rounded-md bg-white shadow">

          {results.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setValue("hsnCodeId", item.id)
                setQuery(item.code)
                setResults([])
              }}
              className="block w-full text-left p-2 hover:bg-gray-100"
            >
              {item.code} - {item.description}
            </button>
          ))}

        </div>
      )}

    </div>
  )
}