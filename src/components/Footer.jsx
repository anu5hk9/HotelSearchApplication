export default function Footer() {
  return (
    <footer className="bg-ink text-paper/60 mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>© {new Date().getFullYear()} Hotel Explorer — built as a learning project.</p>
        <p className="font-mono">
          Data via{' '}
          <a
            href="https://demohotelsapi.pythonanywhere.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-paper"
          >
            Demo Hotels API
          </a>
        </p>
      </div>
    </footer>
  )
}
