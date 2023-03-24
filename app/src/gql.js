import { gql } from '@apollo/client';

export const TRANSACTION_QUERY = gql`
  query Transfers($skip: Int) {
    transfers(skip: $skip, first: 10) {
      blockTimestamp
      blockNumber
      from
      id
      to
      tokenId
      transactionHash
    }
  }
`;
