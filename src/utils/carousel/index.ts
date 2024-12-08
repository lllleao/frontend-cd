/* eslint-disable @typescript-eslint/no-unused-expressions */
// States
type StateProps = {
    startPoint: number
    positionSaved: number
    currentPoint: number
    moviment: number
    indexCurrent: number
    positionSavedBefore: number
    positionSavedAfter: number
    positionSavedTotal: number
}

const state: StateProps = {
    startPoint: 0,
    positionSaved: 0,
    currentPoint: 0,
    moviment: 0,
    indexCurrent: 0,
    positionSavedBefore: 0,
    positionSavedAfter: 0,
    positionSavedTotal: 0
}
let count = 0
let testLoop: boolean
//

export const handleTouch = (
    event: React.TouchEvent<HTMLAnchorElement>,
    carrousselItems: NodeListOf<Element> | null | undefined,
    items: Element[] | undefined,
    clonedMainRight: number | undefined,
    clonedMainLibLeft: number | undefined,
    setRemoveTouchMove:
        | ((value: React.SetStateAction<boolean>) => void)
        | undefined,
    setRemoveTouchEnd:
        | ((value: React.SetStateAction<boolean>) => void)
        | undefined
) => {
    if (carrousselItems) {
        const index = items?.indexOf(event.currentTarget as Element)

        touchMoves(
            event,
            index as number,
            clonedMainRight,
            clonedMainLibLeft,
            setRemoveTouchMove,
            setRemoveTouchEnd
        )
    }
}

export const touchMoves = (
    e: React.TouchEvent<HTMLAnchorElement>,
    index: number,
    clonedMainRight: number | undefined,
    clonedMainLibLeft: number | undefined,
    setRemoveTouchMove:
        | ((value: React.SetStateAction<boolean>) => void)
        | undefined,
    setRemoveTouchEnd:
        | ((value: React.SetStateAction<boolean>) => void)
        | undefined
) => {
    state.indexCurrent = index

    if (index === clonedMainRight || index === clonedMainLibLeft) {
        setRemoveTouchMove && setRemoveTouchMove(true)
        setRemoveTouchEnd && setRemoveTouchEnd(true)
    } else {
        state.startPoint = e.targetTouches[0].clientX

        state.currentPoint = state.startPoint - state.positionSaved
        state.positionSavedBefore = state.positionSaved

        setRemoveTouchEnd && setRemoveTouchEnd(true)
        setRemoveTouchMove && setRemoveTouchMove(false)
    }
}

// Mouses Move
export const onMouseMove = (
    e: React.TouchEvent<HTMLAnchorElement>,
    carrousselItems: NodeListOf<Element> | null | undefined,
    setRemoveTouchEnd:
        | ((value: React.SetStateAction<boolean>) => void)
        | undefined
) => {
    state.moviment = e.targetTouches[0].clientX - state.currentPoint
    state.positionSaved = state.moviment

    carrousselItems?.forEach((item) => {
        ;(item as HTMLElement).style.cssText =
            `transform: translateX(${state.moviment}px);`
        setRemoveTouchEnd && setRemoveTouchEnd(false)
    })
}

export const onMouseUp = (
    elementWidth: number | undefined,
    mainLib: number | undefined,
    clonedMainLibLeft: number | undefined,
    clonedMainRight: number | undefined,
    carrousselItems: NodeListOf<Element> | null | undefined
) => {
    state.positionSavedAfter = state.moviment
    state.positionSavedTotal =
        state.positionSavedAfter - state.positionSavedBefore

    if (elementWidth && mainLib && clonedMainLibLeft && carrousselItems) {
        if (state.positionSavedTotal < -100) {
            count = countTheElementsToPass(
                mainLib,
                clonedMainLibLeft,
                clonedMainRight
            )
                ? 1
                : count + 1 // por ultimo
            const position = count * (elementWidth + 16)
            setTranslate(-position, carrousselItems)
        } else if (state.positionSavedTotal > 100) {
            count = countTheElementsToPass(
                mainLib,
                clonedMainLibLeft,
                clonedMainRight
            )
                ? -1
                : count - 1
            const position = count * (elementWidth + 16)
            setTranslate(-position, carrousselItems)
        } else {
            const position =
                (state.indexCurrent - mainLib) * (elementWidth + 16)
            setTranslate(-position, carrousselItems)
        }

        testLoop =
            state.positionSaved ===
                (elementWidth + 16) * (mainLib - clonedMainLibLeft) ||
            state.positionSaved ===
                (elementWidth + 16) * (clonedMainLibLeft - mainLib)
    }
}

// Additionals funcs
function countTheElementsToPass(
    mainLib: number | undefined,
    clonedMainLibLeft: number | undefined,
    clonedMainRight: number | undefined
) {
    const resetCountTest =
        state.indexCurrent === mainLib ||
        state.indexCurrent === clonedMainLibLeft ||
        state.indexCurrent === clonedMainRight

    return resetCountTest
}

function setTranslate(
    position: number,
    carrousselItems: NodeListOf<Element> | null
) {
    carrousselItems?.forEach((item) => {
        ;(item as HTMLElement).style.cssText =
            `transform: translateX(${position}px);`
        ;(item as HTMLElement).style.transition = 'transform 0.3s'
    })

    state.positionSaved = position
}
//
export const loop = (e: React.TransitionEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget as HTMLElement
    if (testLoop) {
        element.style.cssText = `transform: translateX(${0}px);`
        element.style.transition = 'none'

        for (const states in state) {
            state[states as keyof StateProps] = 0
        }
    }
}
