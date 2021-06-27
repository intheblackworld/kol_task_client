import { useEffect, useState } from 'react'
// import { loginStatus, userInfo } from 'api/UserAPI'
// import { useDispatch, useSelector } from 'react-redux'
// import UserProfile, {
//   actLogin,
//   actLogout,
//   actUserInfo,
//   actLoading,
//   actFail,
// } from 'store/module/UserProfile'
// import { authority as actAuthority } from 'store/module/KycProfile'
// import useUserInfoState from 'views/_hooks/useUserInfoState'

// const LOGIN_STATUS_TIME = 30 * 1000

/**
 * To check the user's login status and register status-check interval
 * @returns isInited To specify whether the app have been prepared or not
 */
function useInitedState() {
  // const dispatch = useDispatch()
  // const { isLogin } = useSelector(UserProfile.reducer)

  const [isInited, setInited] = useState(false)
  // useUserInfoState()
  // setInited(true)
  useEffect(() => {
    setInited(true)
    // dispatch(actLoading('info'))
    // Promise.all([loginStatus(), userInfo()])
    //   .then(([status, info]) => {
    //     if (!status.isLogin || !info.isKyc) {
    //       return
    //     }

    //     dispatch(actLogin())
    //     dispatch(actUserInfo(info))
    //     dispatch(
    //       actAuthority({
    //         fiatDeposit: info.allowFiatDeposit,
    //         fiatWithdraw: info.allowFiatWithdrawal,
    //         cryptoDeposit: info.allowCryptoDeposit,
    //         cryptoWithdraw: info.allowCryptoWithdrawal,
    //         trade: info.allowTrade,
    //         transfer: info.allowTransfer,
    //       }),
    //     )
    //   })
    //   .catch(() => {
    //     dispatch(actFail('info'))
    //   })
    //   .finally(() => {
    //     setInited(true)
    //   })
  }, [])

  return isInited
}

export default useInitedState
