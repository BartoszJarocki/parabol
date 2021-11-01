import styled from '@emotion/styled'
import React, {Suspense, useRef} from 'react'
import {DECELERATE, fadeUp} from '../styles/animation'
import useBreakpoint from '../hooks/useBreakpoint'
import {Elevation} from '../styles/elevation'
import {Breakpoint, ZIndex, Spotlight} from '../types/constEnums'
import spotlightResultsRootQuery, {
  SpotlightResultsRootQuery
} from '../__generated__/SpotlightResultsRootQuery.graphql'
import SpotlightResultsRoot from './SpotlightResultsRoot'
import SpotlightTopBar from './SpotlightTopBar'
import SpotlightSearchBar from './SpotlightSearchBar'
import useQueryLoaderNow from '../hooks/useQueryLoaderNow'
import SpotlightSourceReflectionCard from './SpotlightSourceReflectionCard'
import {PALETTE} from '../styles/paletteV3'
import {GroupingKanban_meeting$data} from '../__generated__/GroupingKanban_meeting.graphql'

const ModalContainer = styled('div')<{isDesktop: boolean}>(({isDesktop}) => ({
  animation: `${fadeUp.toString()} 300ms ${DECELERATE} 300ms forwards`,
  background: '#FFFF',
  borderRadius: 8,
  boxShadow: Elevation.Z8,
  display: 'flex',
  flexWrap: 'wrap',
  height: '80vh',
  justifyContent: 'center',
  opacity: 0,
  overflow: 'hidden',
  width: isDesktop ? '80vw' : '90vw',
  zIndex: ZIndex.DIALOG
}))

const SelectedReflectionSection = styled('div')({
  alignItems: 'flex-start',
  background: PALETTE.SLATE_100,
  borderRadius: '8px 8px 0px 0px',
  display: 'flex',
  flexWrap: 'wrap',
  height: `${Spotlight.SELECTED_HEIGHT_PERC}%`,
  justifyContent: 'center',
  padding: 16,
  position: 'relative',
  width: '100%'
})
interface Props {
  closeSpotlight: () => void
  flipRef: (instance: HTMLDivElement) => void
  meeting: GroupingKanban_meeting$data
}

const SpotlightModal = (props: Props) => {
  const {closeSpotlight, flipRef, meeting} = props
  const {id: meetingId, spotlightReflection} = meeting
  const spotlightReflectionId = spotlightReflection?.id
  if (!spotlightReflectionId) {
    return null
  }
  const spotlightSearchQuery = meeting.spotlightSearchQuery ?? ""

  const queryRef = useQueryLoaderNow<SpotlightResultsRootQuery>(spotlightResultsRootQuery, {
    reflectionId: spotlightReflectionId,
    searchQuery: spotlightSearchQuery,
    meetingId
  }, 'network-only')
  const isDesktop = useBreakpoint(Breakpoint.NEW_MEETING_SELECTOR)
  const phaseRef = useRef(null)
  return (
    <ModalContainer isDesktop={isDesktop} ref={phaseRef}>
      <SelectedReflectionSection>
        <SpotlightTopBar closeSpotlight={closeSpotlight} />
        <SpotlightSearchBar meetingId={meetingId} spotlightSearchQuery={spotlightSearchQuery} />
      </SelectedReflectionSection>
      <Suspense fallback={''}>
        {queryRef && (
          <SpotlightResultsRoot queryRef={queryRef} phaseRef={phaseRef} />
        )}
      </Suspense>
      <SpotlightSourceReflectionCard meeting={meeting} flipRef={flipRef} />
    </ModalContainer>
  )
}
export default SpotlightModal
