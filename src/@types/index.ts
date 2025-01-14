import { BAD_FOX_3D_POLICY_ID, BAD_FOX_POLICY_ID, BAD_KEY_POLICY_ID, BAD_MOTORCYCLE_POLICY_ID } from '../constants';
import type { BadLabsApiPopulatedToken } from '../utils/badLabsApi';

export type PolicyId = typeof BAD_FOX_POLICY_ID | typeof BAD_MOTORCYCLE_POLICY_ID | typeof BAD_KEY_POLICY_ID | typeof BAD_FOX_3D_POLICY_ID

export interface PopulatedAsset extends BadLabsApiPopulatedToken {
  isBurned: boolean
  price?: number
}

export interface PopulatedWallet {
  stakeKey: string
  walletAddress: string
  assets: Record<PolicyId, PopulatedAsset[]>
}

export type TraitsFile = Record<
  string,
  {
    onChainName: string
    displayName: string
    model: string
    image: string
    count: number
    percent: string
  }[]
>

export interface FloorPrices {
  [category: string]: {
    [trait: string]: number
  }
}

export interface FloorSnapshot {
  policyId: PolicyId
  timestamp: number
  floor: number
  attributes: FloorPrices
}

export interface Trade {
  timestamp: number
  stakeKey: string
  depositAmount: number
  depositTx: string
  withdrawAmount: number
  withdrawTx: string
}
