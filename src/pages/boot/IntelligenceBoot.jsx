import { useDesktopBlock } from '../../hooks/useDesktopBlock'
import { AgentProvider } from '../../terminal/AgentContext'
import LiveAgent from '../../terminal/LiveAgent'

export default function IntelligenceBoot() {
  useDesktopBlock()

  return (
    <AgentProvider>
      <LiveAgent />
    </AgentProvider>
  )
}
