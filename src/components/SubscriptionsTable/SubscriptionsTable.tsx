import React from 'react'

import { SubscriptionsTableProps } from './types'
import useStyles from './styles'

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ arrayOfSubs }) => {
  const classes = useStyles()

  const generateSubscriptionsTableEntries = () => {
    const arrayOfTableEntries = arrayOfSubs.map((sub, index) => {
      return (
        <div
          className={
            index % 2 === 0
              ? classes.regularSubscriptionsTableEntry
              : classes.alternativeSubscriptionsTableEntry
          }
          key={`subscriptionsTableEntry${index}`}
        >
          <p>{sub.subName}</p>

          <p>{sub.subNextBillingDate}</p>
        </div>
      )
    })

    return arrayOfTableEntries
  }

  return (
    <div className={classes.subscriptionsTable}>
      <div className={classes.subscriptionsTableHeader}>
        <p>Subscription</p>

        <p>Next billing date</p>
      </div>

      {generateSubscriptionsTableEntries()}
    </div>
  )
}

export default SubscriptionsTable
