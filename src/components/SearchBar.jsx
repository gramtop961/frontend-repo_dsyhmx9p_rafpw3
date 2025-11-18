import { useState } from 'react'

export default function SearchBar({ onSearch, allowPreviews, onTogglePreviews }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (q.trim().length < 2) return
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} className="w-full flex flex-col md:flex-row items-stretch gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tracks, artists..."
        className="flex-1 rounded-xl bg-slate-800/70 border border-slate-700 text-white px-4 py-3 outline-none focus:border-blue-500/60"
      />
      <button
        type="submit"
        className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 font-medium transition-colors"
      >
        Search
      </button>
      <label className="flex items-center gap-2 text-blue-200/80 text-sm select-none">
        <input type="checkbox" checked={allowPreviews} onChange={(e) => onTogglePreviews(e.target.checked)} />
        <span>Allow metadata-only playback (previews). Off by default.</span>
      </label>
    </form>
  )
}
