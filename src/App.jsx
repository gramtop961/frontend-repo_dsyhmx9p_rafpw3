import { useState } from 'react'
import SearchBar from './components/SearchBar'
import TrackList from './components/TrackList'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [allowPreviews, setAllowPreviews] = useState(false)

  const onSearch = async (q) => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/search?q=${encodeURIComponent(q)}&allow_metadata_only_playback=${allowPreviews ? 'true' : 'false'}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const onPlay = async (t) => {
    // In a complete app, we would request a signed proxy url then pass to <audio> or HLS player
    alert(`Would play via provider=${t.best_source.provider_name} source_id=${t.best_source.source_id}. We never play previews.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Open Music Player (Streamability-First)</h1>
          <p className="text-blue-200/80 mt-2">Search multiple providers. We only play full tracks, never previews. Source and license are shown for every result.</p>
        </div>

        <SearchBar onSearch={onSearch} allowPreviews={allowPreviews} onTogglePreviews={setAllowPreviews} />

        {loading ? (
          <div className="text-blue-200/80 mt-6">Searching…</div>
        ) : (
          <TrackList items={items} onPlay={onPlay} />
        )}
      </div>
    </div>
  )
}

export default App
