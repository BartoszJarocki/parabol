import React, {Component} from 'react'
import styled from 'react-emotion'
import AddTeamMemberModalBoundary from './AddTeamMemberModalBoundary'
import DialogContent from './DialogContent'
import DialogTitle from './DialogTitle'

interface Props {
  closePortal: () => void
  successfulInvitations: Array<string>
}

const UL = styled('ul')({
  padding: '0 0 0 1rem'
})

const LI = styled('li')({
  display: 'block',
  lineHeight: '1.5rem'
})

class AddTeamMemberModalSuccess extends Component<Props> {
  exitTimeoutId: number | undefined

  componentDidMount () {
    this.exitTimeoutId = window.setTimeout(() => {
      this.props.closePortal()
    }, 5000)
  }

  componentWillUnmount () {
    clearTimeout(this.exitTimeoutId)
  }

  render () {
    const {successfulInvitations} = this.props
    return (
      <AddTeamMemberModalBoundary>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <span>An invitation has been sent to</span>
          {successfulInvitations.length === 1 ? <span> {successfulInvitations[0]}.</span> : ':'}
          {successfulInvitations.length > 1 && (
            <UL>
              {successfulInvitations.map((email) => {
                return <LI key={email}>{email}</LI>
              })}
            </UL>
          )}
        </DialogContent>
      </AddTeamMemberModalBoundary>
    )
  }
}

export default AddTeamMemberModalSuccess
