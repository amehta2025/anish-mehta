// DEV ONLY — Demo / Worst case / One / Empty / Many switch for stress-testing the layout.
// Rendered only when import.meta.env.DEV (see App.jsx). Selection lives in ?data= so reloads keep it.
const states = [
  ['', 'Demo'],
  ['worst', 'Worst case'],
  ['one', 'One'],
  ['empty', 'Empty'],
  ['many', 'Many'],
]

const bar = {
  position: 'fixed', left: '50%', bottom: 16, transform: 'translateX(-50%)', zIndex: 1000,
  display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: '#e4e4e7',
  boxShadow: '0 4px 16px rgba(0,0,0,.18)', font: '500 12px system-ui, sans-serif',
}
const seg = (active) => ({
  border: 0, borderRadius: 999, padding: '6px 12px', cursor: 'pointer', font: 'inherit',
  background: active ? '#fff' : 'transparent', color: active ? '#111' : '#52525b',
  boxShadow: active ? '0 1px 2px rgba(0,0,0,.15)' : 'none',
})

export default function DataToggle() {
  const current = new URLSearchParams(window.location.search).get('data') || ''
  const go = (key) => {
    const url = new URL(window.location.href)
    if (key) url.searchParams.set('data', key)
    else url.searchParams.delete('data')
    window.location.assign(url)
  }
  return (
    <div style={bar} role="group" aria-label="Dev data set">
      {states.map(([key, label]) => (
        <button key={label} type="button" style={seg(current === key)} aria-pressed={current === key} onClick={() => go(key)}>
          {label}
        </button>
      ))}
    </div>
  )
}
