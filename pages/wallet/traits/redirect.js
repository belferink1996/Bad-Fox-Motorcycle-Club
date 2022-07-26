import { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import DiscordFetchingAccount from '../../../components/DiscordAuth/FetchingAccount'
import DiscordNotAuthorized from '../../../components/DiscordAuth/NotAuthorized'
import MyWalletTraits from '../../../components/Wallet/MyTraits'

export default function Page() {
  const { loading, token, account, getAccountWithDiscordToken } = useAuth()

  useEffect(() => {
    ;(async () => {
      await getAccountWithDiscordToken()
    })()
  }, [])

  return (
    <div className='App flex-col'>
      <Header />
      {loading && (!token || !account) ? (
        <DiscordFetchingAccount />
      ) : token && account ? (
        <MyWalletTraits />
      ) : (
        <DiscordNotAuthorized />
      )}
      <Footer />
    </div>
  )
}