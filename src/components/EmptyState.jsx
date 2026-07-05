export default function EmptyState({ title, description, actionLabel, onAction, tone = 'neutral' }) {
  const border = tone === 'error' ? 'border-rust/40' : 'border-ink/15'

  return (
    <div className={`text-center border ${border} border-dashed rounded-stub bg-white/50 py-16 px-6`}>
      <div className="text-4xl mb-3" aria-hidden="true">
        {tone === 'error' ? '⚠️' : '🧳'}
      </div>
      <h3 className="font-display text-xl text-ink mb-1">{title}</h3>
      <p className="text-ink/60 max-w-sm mx-auto text-sm">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink-light transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
