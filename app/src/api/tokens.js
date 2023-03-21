import {fetcherJson} from './root'
export const getTokens = () => fetcherJson(() => fetch('https://transacta.ongrid.pro/api/tokens'), {minDuration: 500})
