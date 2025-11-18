import { useMemo } from 'react'

function Badge({ children, tone = 'blue' }) {
  const toneCls = tone === 'green' ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30' : tone === 'red' ? 'bg-rose-600/20 text-rose-300 border-rose-500/30' : 'bg-blue-600/20 text-blue-300 border-blue-500/30'
  return (
    <span className={`text-xs px-2 py-1 rounded border ${toneCls}`}>{children}</span>
  )
}

export default function TrackList({ items = [], onPlay }) {
  const rows = useMemo(() => items || [], [items])
  return (
    <div className="mt-6 grid gap-3">
      {rows.map((t) => (
        <div key={t.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-700">
              {t.cover_url ? <img src={t.cover_url} alt="cover" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <div className="text-white font-semibold">{t.title}</div>
              <div className="text-sm text-blue-200/70">{t.artist || 'Unknown Artist'}</div>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                {t.best_source ? (
                  <>
                    <Badge>Source: {t.best_source.provider_name}</Badge>
                    {t.best_source.license ? <Badge tone="green">License: {t.best_source.license}</Badge> : null}
                    {t.best_source.audiodownload_allowed ? <Badge tone="green">Download allowed</Badge> : <Badge tone="red">Download not allowed</Badge>}
                  </>
                ) : (
                  <Badge tone="red">Preview or metadata only</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={!t.best_source}
              onClick={() => t.best_source && onPlay(t)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {t.best_source ? 'Play' : 'No full stream'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
