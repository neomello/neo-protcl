export const glitch = () => {
  const amount = Math.random() * 1.2
  return {
    transform: `translateX(${amount}px)`,
  }
}
