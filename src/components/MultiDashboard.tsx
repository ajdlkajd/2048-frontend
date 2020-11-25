import React, { useState } from 'react'
import styled from '@emotion/styled'

import {useGame} from '../hooks/useGame'
import Tile from './Tile'
import calcTime from '../utils/calcTime'

interface MultiDashboardProps {
  emitBomb: () => void;
  emitFreeze: () => void
}

function MultiDashboard ({emitBomb, emitFreeze}: MultiDashboardProps) {
  const {score, undoMove, opponentScore, opponentBoard, endTime} = useGame()
  const [remainingTime, setRemainingTime] = useState('')

  setTimeout(() => {
    if(endTime) {
      const formattedTime = calcTime(endTime)
      setRemainingTime(formattedTime)
    }
  }, 1000)

    return (
      <DashboardContainer>
        <FirstSection>
          <StatsGroup>
            <Score>
              <h3>Opponent</h3>
              <p>{opponentScore}</p>
            </Score>
            <Score >
              <h3>You</h3>
              <p>{score}</p>
            </Score>
            <Score >
              <h3>Time</h3>
              <p>{remainingTime}</p>
            </Score>
          </StatsGroup>
        </FirstSection>

        <SecondSection>
          {opponentBoard  && (
            <OpponentBoard>
              {
                opponentBoard.map((value: number, idx: number) => <Tile key={idx} value={value} size={'small'}/>)
              }
            </OpponentBoard>
          )}
          <ButtonsGroup>
            <ShopBtnsBox>
              <ShopBtn onClick={emitBomb} disabled={score < 250 ? true : false}>
                <h3>Bomb</h3>
                <p>250 points</p>
              </ShopBtn>
              <ShopBtn onClick={emitFreeze} disabled={score < 750 ? true : false}>
                <h3>Freeze</h3>
                <p>750 points</p>
              </ShopBtn>
            </ShopBtnsBox>
            <LargeButton onClick={undoMove}>Undo</LargeButton>
          </ButtonsGroup>
        </SecondSection>
      </DashboardContainer>
    );
}

export default MultiDashboard

const DashboardContainer = styled.div`
  width: 93%;
  margin: 0 auto .5rem auto;
`

const FirstSection = styled.div`
  margin-bottom: .5rem;
`

const StatsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Score = styled.div`
  width: 30%;
  text-align: center;
  background: #ede0c8;
  color: #776e65;
  border-radius: .5em;
  h3 {
    font-size: 1.25rem;
    margin: .25em 0;
  }
  p {
    font-size: 1.1rem;
    margin: .25em 0;
  }
`

const SecondSection = styled.div`
  display: flex;
`

const OpponentBoard = styled.div`
  width: 45%;
  position: relative;
  background: #bbada0;
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: .15rem;
  padding: .15rem;
  user-select: none;
  touch-action: none;
`

const ButtonsGroup = styled.div`
  margin-left: .5rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ShopBtnsBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`

const ShopBtn = styled.button`
  font-size: 1rem;
  margin: .5em 0;
  padding: .75em 0;
  width: 45%;
  background: #eee4da;
  color: #776e65;
  border-radius: .5em;
  text-align: center;

  h3 {
    margin: 0
  }

  p {
    margin: 0
  }
  &[disabled] {
    filter: grayscale(1);
  }
`

const LargeButton = styled.button`
  font-size: 1.5rem;
  margin: .5em 0;
  width: 90%;
  padding: .25em 0;
  background: #eee4da;
  color: #776e65;
  border-radius: .5em;
`

