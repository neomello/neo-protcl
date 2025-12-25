import { useState, useEffect } from 'react'
import {
  initMCP,
  acknowledgeNodeOffChain,
  readNodes,
  getMCPState,
  registerInteraction,
  persistMCPState,
  loadMCPState,
} from '../context/mcp/index'

export function useMCP() {
  const [nodes, setNodes] = useState([])
  const [state, setState] = useState(null)
  const [initialized, setInitialized] = useState(false)

  // Inicializar MCP
  useEffect(() => {
    const loaded = loadMCPState()
    setNodes(loaded.nodes)
    setState(loaded.state)

    if (!loaded.state.connected) {
      initMCP()
    }

    setInitialized(true)
  }, [])

  // Enviar ação
  const sendAction = (actionType, payload) => {
    const interaction = {
      type: actionType,
      payload,
      id: `action_${Date.now()}`,
    }

    registerInteraction(interaction)
    persistMCPState()

    const newState = getMCPState()
    setState(newState)

    return interaction
  }

  // Registrar evento (acknowledge off-chain)
  const registerEvent = (eventType, handler) => {
    const eventNode = acknowledgeNodeOffChain(`event_${Date.now()}`, {
      type: 'event',
      eventType,
      handler: handler.toString(),
    })

    setNodes(readNodes())
    persistMCPState()

    return eventNode
  }

  // Atualizar estado
  const updateState = () => {
    setState(getMCPState())
    setNodes(readNodes())
  }

  return {
    nodes,
    state,
    initialized,
    sendAction,
    registerEvent,
    updateState,
  }
}
