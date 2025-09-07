import React from 'react'
import Board from './components/Board'
import LeaderBoard from './components/LeaderBoard'
import Layout from './frame/layout'
import { GameProvider } from './context/GameContext'
import InfoModal from './components/InfoModal'

const App = () => {
  return (
    <GameProvider>
      <Layout sidebar={<LeaderBoard />}>
        <Board />
        {/* Info modal button */}
        <InfoModal />
      </Layout>
    </GameProvider>
  )
}

export default App
