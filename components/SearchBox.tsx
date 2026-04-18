// components/SearchBox.tsx
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch(e: React.SubmitEvent) {
    e.preventDefault()

    if (!query.trim()) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="cursor-pointer border px-3 py-2"
      />
      <button className="bg-black text-white px-4">
        Search
      </button>
    </form>
  )
}