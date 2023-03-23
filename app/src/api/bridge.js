import { ethers } from 'ethers'
import networks from '../networks.json'
import { fetcherJson } from './root'

import abis from './abis'

const { L1BridgeAbi, L1TokenAbi, L2BridgeAbi, L2TokenAbi } = abis

const host = process.env.REACT_APP_API_HOST

const GoerliTokenAddress = networks[5].tokenAddress
const GoerliBridgeAddress = networks[5].bridgeAddress
const ZkSyncTokenAddress = networks[280].tokenAddress
const ZkSyncBridgeAddress = networks[280].bridgeAddress
const ScrollTokenAddress = networks[534353].tokenAddress
const ScrollBridgeAddress = networks[534353].bridgeAddress
const PolygonTokenAddress = networks[1442].tokenAddress
const PolygonBridgeAddress = networks[1442].bridgeAddress

export let provider = null
let signer = null
let GoerliToken = null
let GoerliBridge = null
let ZkSyncToken = null
let ZkSyncBridge = null
let ScrollToken = null
let ScrollBridge = null
let PolygonToken = null
let PolygonBridge = null

let AddressZero = null

let Contracts = null

try {
  provider = new ethers.providers.Web3Provider(window.ethereum)
  signer = provider.getSigner()
  GoerliToken = new ethers.Contract(GoerliTokenAddress, L1TokenAbi, signer)
  GoerliBridge = new ethers.Contract(GoerliBridgeAddress, L1BridgeAbi, signer)
  ZkSyncToken = new ethers.Contract(ZkSyncTokenAddress, L2TokenAbi, signer)
  ZkSyncBridge = new ethers.Contract(ZkSyncBridgeAddress, L2BridgeAbi, signer)
  ScrollToken = new ethers.Contract(ScrollTokenAddress, L2TokenAbi, signer)
  ScrollBridge = new ethers.Contract(ScrollBridgeAddress, L2BridgeAbi, signer)
  PolygonToken = new ethers.Contract(PolygonTokenAddress, L2TokenAbi, signer)
  PolygonBridge = new ethers.Contract(PolygonBridgeAddress, L2BridgeAbi, signer)

  AddressZero = ethers.constants.AddressZero

  Contracts = {
    5: { Token: GoerliToken, Bridge: GoerliBridge, BridgeAddress: GoerliBridgeAddress },
    280: { Token: ZkSyncToken, Bridge: ZkSyncBridge, BridgeAddress: ZkSyncBridgeAddress },
    534353: {
      Token: ScrollToken,
      Bridge: ScrollBridge,
      BridgeAddress: ScrollBridgeAddress,
    },
    1442: {
      Token: PolygonToken,
      Bridge: PolygonBridge,
      BridgeAddress: PolygonBridgeAddress
    }
  }
} catch (e) {
  console.log(e)
}

export async function bridgeToken(
  fromChainId,
  toChainId,
  tokenId,
  setPending,
  setTransactionStatus,
  setTxLink,
  setIsLoading,
  setConfirmed,
  setError,
) {
  const Token = Contracts[fromChainId].Token;
  const Bridge = Contracts[fromChainId].Bridge;
  const BridgeAddress = Contracts[fromChainId].BridgeAddress;
  const signerAddress = await signer.getAddress();
  const allowance = (await Token.getApproved(tokenId)).toString(); 

  if (allowance === AddressZero) {
    try {
      setPending(true)
      const approve = await Token.approve(
        BridgeAddress, 
        tokenId, 
        { from: signerAddress, }
      )
      setTransactionStatus(`Approving`)
      setTxLink(approve.hash)
      await approve.wait()
      setTransactionStatus(`Approved`)
      setTxLink(approve.hash)
      const transfer = await Bridge.bridgeToL2(
        toChainId,
        tokenId,
        {
          from: signerAddress,
          value: ethers.utils.parseEther(
            `${networks[fromChainId].brigingPrice[toChainId].value}`,
          ),
        },
      )
      setTransactionStatus(`Outbound`)
      setTxLink(transfer.hash)
      await transfer.wait()
      setTransactionStatus(`Mined`)
      setTxLink(transfer.hash)
      setTimeout(async function testTokens() {
        try {
          const res = await fetcherJson(() => fetch(`${host}/tokens/`))
          const tx = res.find(tx => tx.tokenId === tokenId)
          if (tx && tx.chainId !== fromChainId) {
            setPending(false)
            setIsLoading(false)
            setConfirmed(true)
          } else {
            setTimeout(testTokens, 2000)
          }
        }
        catch (error) {
          console.error(error)
        }
      }, 1000)
    }
    catch (error) {
      setPending(false)
      setIsLoading(false)
      setError(error)
    }
    finally {
      return
    }
  }

  setIsLoading(true)
  setPending(true)
  try {
    const tx = await Bridge.bridgeToL2(toChainId, tokenId)
    await tx.wait()
  }
  catch (error) {
    setError(error)
  }
  finally {
    setIsLoading(false)
    setPending(false)
  }
}
