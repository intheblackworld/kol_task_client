import {
  InMemoryCache,
  // Reference, 
  // makeVar
} from '@apollo/client'

// export const isLoggedInVar = makeVar(!!localStorage.getItem("token"))

// export const cartItemsVar = makeVar([])


export const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       isLoggedIn: {
  //         read() {
  //           return isLoggedInVar()
  //         }
  //       },
  //       cartItems: {
  //         read() {
  //           return cartItemsVar()
  //         }
  //       },
  //       launches: {
  //         keyArgs: false,
  //         merge(existing, incoming) {
  //           let launches = []
  //           if (existing && existing.launches) {
  //             launches = launches.concat(existing.launches)
  //           }
  //           if (incoming && incoming.launches) {
  //             launches = launches.concat(incoming.launches)
  //           }
  //           return {
  //             ...incoming,
  //             launches
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
})