import React, { useState, useEffect } from 'react'
import CardContainer from './CardContainer'
import { CardProps } from './Card'
import './FarmingPage.css'

interface PropTypes {
    inventory: object[]
    onInventoryChange: Function
}

export default function FarmingPage({ inventory, onInventoryChange }: PropTypes) {
    // ============ CARDS
    const CARD_COLORS: CardProps[] = [
        { name: 'red', color: 'red' },
        { name: 'green', color: 'green' },
        { name: 'blue', color: 'blue' },
        { name: 'other', color: 'gray' },
    ]
    const RED_CARDS: CardProps[] = [
        { name: 'almighty', color: 'red' },
        { name: 'blackroom', color: 'red' },
        { name: 'bottomless', color: 'red' },
        { name: 'feeble', color: 'red' },
        { name: 'looming', color: 'red' },
        { name: 'premium', color: 'red' },
        { name: 'roulette', color: 'red' },
        { name: 'sleeping', color: 'red' },
        { name: 'teeming', color: 'red' },
        { name: 'tranquil', color: 'red' },
        { name: 'whiteroom', color: 'red' },
    ]
    const GREEN_CARDS: CardProps[] = [
        { name: 'alchemic', color: 'green' },
        { name: 'lasting', color: 'green' },
        { name: 'martial', color: 'green' },
        { name: 'meeting', color: 'green' },
        { name: 'sorcerous', color: 'green' },
        { name: 'stagnant', color: 'green' },
        { name: 'strong', color: 'green' },
    ]
    const BLUE_CARDS: CardProps[] = [
        { name: 'calm', color: 'blue' },
        { name: 'false', color: 'blue' },
        { name: 'guarded', color: 'blue' },
        { name: 'mingling', color: 'blue' },
        { name: 'moments', color: 'blue' },
        { name: 'moogle', color: 'blue' },
    ]
    const OTHER_CARDS: CardProps[] = [
        { name: 'joker', color: 'gray' },
    ]
    const CARD_VALUES: CardProps[] = [
        { name: '0', color: 'red', frame: false, value: 0 },
        { name: '1', color: 'red', frame: false, value: 1 },
        { name: '2', color: 'red', frame: false, value: 2 },
        { name: '3', color: 'red', frame: false, value: 3 },
        { name: '4', color: 'red', frame: false, value: 4 },
        { name: '5', color: 'red', frame: false, value: 5 },
        { name: '6', color: 'red', frame: false, value: 6 },
        { name: '7', color: 'red', frame: false, value: 7 },
        { name: '8', color: 'red', frame: false, value: 8 },
        { name: '9', color: 'red', frame: false, value: 9 },
    ]

    // ============ STATE
    const [activeColor, setActiveColor] = useState(-1)
    const [activeCard, setActiveCard] = useState(-1)
    const [activeValue, setActiveValue] = useState(-1)

    const resetState = () => {
        setActiveColor(-1)
        setActiveCard(-1)
        setActiveValue(-1)
    }

    // append card to top-level app inventory
    useEffect(() => {
        // Random Joker
        if (activeColor === 3 && activeCard === 0) {
            onInventoryChange(inventory.concat([OTHER_CARDS[0]]))
            resetState()
        }
        else if (activeValue >= 0) {
            let newCard
            if (activeColor === 0) {
                newCard = { ...RED_CARDS[activeCard] }
            }
            else if (activeColor === 1) {
                newCard = { ...GREEN_CARDS[activeCard] }
            }
            else if (activeColor === 2) {
                newCard = { ...BLUE_CARDS[activeCard] }
            }
            newCard.value = activeValue
            onInventoryChange(inventory.concat([newCard]))
            resetState()
        }
    }, [activeCard, activeValue])

    return (
    <div className="FarmingPage">
        <div>Color: {activeColor}</div>
        <div>Card: {activeCard}</div>
        <div>Value: {activeValue}</div>
        <CardContainer
            activeIndex={activeColor}
            onActiveIndexChange={setActiveColor}
            cards={ CARD_COLORS } />

        {/* Card types */}
        { activeColor === 0 && (<CardContainer
            activeIndex={activeCard}
            onActiveIndexChange={setActiveCard}
            cards={ RED_CARDS } />) }
        { activeColor === 1 && (<CardContainer
            activeIndex={activeCard}
            onActiveIndexChange={setActiveCard}
            cards={ GREEN_CARDS } />) }
        { activeColor === 2 && (<CardContainer
            activeIndex={activeCard}
            onActiveIndexChange={setActiveCard}
            cards={ BLUE_CARDS } />) }
        { activeColor === 3 && (<CardContainer
            activeIndex={activeCard}
            onActiveIndexChange={setActiveCard}
            cards={ OTHER_CARDS } />) }

        {/* Card values */}
        { activeCard >= 0 && activeColor < 3 && (<CardContainer
            activeIndex={activeValue}
            onActiveIndexChange={setActiveValue}
            cards={ CARD_VALUES } />) }
    </div>
    )
}