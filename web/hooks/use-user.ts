import { useContext, useRef } from 'react'
import {
  useFirestoreDocumentData,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore'
import { useQueryClient } from 'react-query'
import { sortBy } from 'lodash'

import { doc, DocumentData } from 'firebase/firestore'
import { getUser, User, users } from 'web/lib/firebase/users'
import { AuthContext } from 'web/components/auth-context'
import { ContractMetrics } from 'common/calculate-metrics'
import { getUserContractMetricsQuery } from 'web/lib/firebase/contract-metrics'
import { buildArray, filterDefined } from 'common/util/array'
import { CPMMBinaryContract } from 'common/contract'
import { useContracts } from './use-contracts'

export const useUser = () => {
  const authUser = useContext(AuthContext)
  return authUser ? authUser.user : authUser
}

export const usePrivateUser = () => {
  const authUser = useContext(AuthContext)
  return authUser ? authUser.privateUser : authUser
}

export const useUserById = (userId = '_') => {
  const result = useFirestoreDocumentData<DocumentData, User>(
    ['users', userId],
    doc(users, userId),
    { subscribe: true, includeMetadataChanges: true }
  )

  if (userId === '_') return undefined

  return result.isLoading ? undefined : result.data
}

export const usePrefetchUser = (userId: string) => {
  return usePrefetchUsers([userId])[0]
}

export const usePrefetchUsers = (userIds: string[]) => {
  const queryClient = useQueryClient()
  return userIds.map((userId) =>
    queryClient.prefetchQuery(['users', userId], () => getUser(userId))
  )
}

export const useUserContractMetricsByProfit = (userId: string, count = 50) => {
  const positiveResult = useFirestoreQueryData<ContractMetrics>(
    ['contract-metrics-descending', userId, count],
    getUserContractMetricsQuery(userId, count, 'desc')
  )
  const negativeResult = useFirestoreQueryData<ContractMetrics>(
    ['contract-metrics-ascending', userId, count],
    getUserContractMetricsQuery(userId, count, 'asc')
  )

  const metrics = buildArray(positiveResult.data, negativeResult.data)
  const contractIds = sortBy(metrics.map((m) => m.contractId))
  const contracts = useContracts(contractIds)

  const prevResult = useRef<{
    contracts: CPMMBinaryContract[]
    metrics: ContractMetrics[]
  }>()

  if (
    !positiveResult.data ||
    !negativeResult.data ||
    contracts.some((c) => c === undefined)
  ) {
    if (prevResult.current) return prevResult.current
    return undefined
  }

  const filteredContracts = filterDefined(contracts).filter(
    (c) => !c.isResolved
  ) as CPMMBinaryContract[]
  const filteredMetrics = metrics
    .filter((m) => m.from && Math.abs(m.from.day.profit) >= 0.5)
    .filter((m) => filteredContracts.find((c) => c.id === m.contractId))

  const result = { contracts: filteredContracts, metrics: filteredMetrics }
  prevResult.current = result
  return result
}

export const useUserContractMetrics = (userId = '_', contractId: string) => {
  const result = useFirestoreDocumentData<DocumentData, ContractMetrics>(
    ['user-contract-metrics', userId, contractId],
    doc(users, userId, 'contract-metrics', contractId)
  )

  if (userId === '_') return undefined

  return result.data
}
