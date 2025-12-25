import particles from '../particles.json'

export function Divider({ className }) {
  return (
    <div className={`flex justify-center my-u3 ${className || ''}`}>
      <span className="text-glitch opacity-70">{particles.divider}</span>
    </div>
  )
}
