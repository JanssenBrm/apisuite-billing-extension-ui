import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import clsx from 'clsx'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useTranslation,
} from '@apisuite/fe-base'
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded'

import { convertDateAndTime } from '../../util/convertDateAndTime'
import { currencyConverter } from '../../util/currencyConverter'
import { TransactionsTableProps } from './types'
import { TransactionDetails } from '../../pages/Billing/types'
import useStyles from './styles'

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  const classes = useStyles()
  const trans = useTranslation()
  const { palette, spacing } = useTheme()

  const t = (str: string) => {
    return trans.t(`extensions.billing.${str}`)
  }

  const generateTableBody = (transactions: TransactionDetails[]) => {
    const tableBodyRows = transactions.length ? (
      transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell style={{ paddingLeft: spacing(5) }}>
            <Typography variant="body2">{transaction.description}</Typography>
          </TableCell>

          <TableCell>
            <Box display="flex">
              <Box mr={1.5}>
                <Typography variant="body2">{transaction.id}</Typography>
              </Box>

              <CopyToClipboard text={transaction.id}>
                <FileCopyRoundedIcon className={classes.transactionIDIcon} />
              </CopyToClipboard>
            </Box>
          </TableCell>

          <TableCell>
            <Typography variant="body2">
              {convertDateAndTime(trans.i18n.language, transaction.date)}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography
              variant="body2"
              className={clsx({
                [classes.completeTransactionStatus]:
                  transaction.status === 'authorized' ||
                  transaction.status === 'paid',
                [classes.failedTransactionStatus]:
                  transaction.status === 'failed',
                [classes.incompleteTransactionStatus]:
                  transaction.status === 'canceled' ||
                  transaction.status === 'expired',
                [classes.openTransactionStatus]: transaction.status === 'open',
                [classes.pendingTransactionStatus]:
                  transaction.status === 'pending',
              })}
            >
              {transaction.status}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography variant="body2">
              {currencyConverter(
                trans.i18n.language,
                transaction.amount.value,
                transaction.amount.currency
              )}
            </Typography>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          align="center"
          colSpan={5}
          style={{ backgroundColor: palette.background.default }}
        >
          <Typography variant="subtitle2">
            <i>{t('transactionsTable.noEntriesAvailable')}</i>
          </Typography>
        </TableCell>
      </TableRow>
    )

    return <TableBody>{tableBodyRows}</TableBody>
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow style={{ borderBottom: '3px solid #ECEDEF' }}>
            <TableCell style={{ paddingLeft: spacing(5) }}>
              <Typography variant="body1">
                <b>{t('transactionsTable.description')}</b>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1">
                <b>{t('transactionsTable.reference')}</b>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1">
                <b>{t('transactionsTable.dateOfPurchase')}</b>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1">
                <b>{t('transactionsTable.status')}</b>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1">
                <b>{t('transactionsTable.price')}</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {generateTableBody(transactions)}
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
