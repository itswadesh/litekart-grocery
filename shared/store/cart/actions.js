import CART from '~/gql/cart/cart.gql'
import ADD_TO_CART from '~/gql/cart/addToCart.gql'
import CLEAR_CART from '~/gql/cart/clearCart.gql'
import CHECKOUT from '~/gql/cart/checkout.gql'
import APPLY_COUPON from '~/gql/cart/applyCoupon.gql'
import REMOVE_COUPON from '~/gql/cart/removeCoupon.gql'
import CASHFREE_PAY_NOW from '~/gql/pay/cashfreePayNow.gql'

export default {
  async fetch({ commit, state, getters }) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.query({
          query: CART,
          fetchPolicy: 'no-cache',
        })
      ).data.cart
      // console.log(data, 'cart datat')
      commit('setCart', data)
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async clear({ commit, state, getters }) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: CLEAR_CART,
        })
      ).data.clearCart
      commit('setCart', {}) // can not pass null else clear cart request will be rejected
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async addToCart({ commit }, payload) {
    if (typeof payload.options !== 'string')
      payload.options = JSON.stringify(payload.options)
    try {
      // commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: ADD_TO_CART,
          variables: payload,
        })
      ).data.addToCart
      commit('setCart', data)
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      // commit('busy', false, { root: true })
    }
  },
  async removeCoupon({ commit }, payload) {
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      let data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: REMOVE_COUPON,
          variables: payload,
        })
      ).data.removeCoupon
      commit('setCart', data)
    } catch (err) {
      commit('setErr', err, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async applyCoupon({ commit }, payload) {
    try {
      commit('clearErr', null, { root: true })
      let data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: APPLY_COUPON,
          variables: payload,
        })
      ).data.applyCoupon
      if (data && data.discount.amount > 0) {
        commit('setCart', data)
        commit('success', 'Coupon applied successfully', { root: true })
      } else {
        throw 'Invalid coupon'
      }
      // this.$router.push('/cart')
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async checkout(
    { commit, state, rootState, getters },
    { paymentMethod, address }
  ) {
    commit('clearErr', null, { root: true })
    paymentMethod = paymentMethod || 'COD'
    switch (paymentMethod) {
      case 'COD':
        try {
          commit('busy', true, { root: true })
          if (!address) {
            commit('setErr', 'Address not provided.', { root: true })
            return
          }
          // delete address.__typename
          // delete address.createdAt
          // delete address.updatedAt
          // if (address.coords) delete address.coords.__typename
          let order = (
            await this.app.apolloProvider.defaultClient.mutate({
              mutation: CHECKOUT,
              variables: {
                address,
                paymentMethod,
              },
            })
          ).data.checkout
          this.$router.push(`/payment/success?id=${order.id}&provider=COD`)
        } catch (err) {
          commit('setErr', err, { root: true })
          this.$router.push(`/payment/failed?provider=COD`)
        } finally {
          commit('busy', false, { root: true })
        }
        break

      case 'Stripe':
        commit('setErr', 'Stripe not implemented yet. Proceed with COD', {
          root: true,
        })
        break
      case 'Cashfree':
        try {
          const cashFreePayload = (
            await this.app.apolloProvider.defaultClient.mutate({
              mutation: CASHFREE_PAY_NOW,
              variables: { address },
            })
          ).data.cashfreePayNow
          if (!cashFreePayload) {
            commit('setErr', 'CashFree not available', {
              root: true,
            })
            break
          }
          const url = cashFreePayload.url
          delete cashFreePayload.__typename
          delete cashFreePayload.url
          delete cashFreePayload.token
          let formI = document.createElement('form')
          formI.setAttribute('id', 'cashfreeForm')
          formI.setAttribute('action', url)
          formI.setAttribute('method', 'POST')
          formI.setAttribute('style', 'display:none;')
          if (cashFreePayload !== null) {
            for (const [key, value] of Object.entries(cashFreePayload)) {
              if (value !== null) {
                let input = document.createElement('input')
                input.setAttribute('type', 'hidden')
                input.setAttribute('name', key)
                input.value = value
                formI.append(input)
              }
            }
          }
          document.querySelector('body').append(formI)
          formI.submit()
          formI.remove()
        } catch (e) {
          commit('setErr', e, { root: true })
          break
        }
        break
      default:
        commit(
          'setErr',
          'The checkout service ' + paymentMethod + ' not yet implemented',
          { root: true }
        )
        // console.log('Unknown checkout service: ' + paymentMethod)
        break
    }
  },
}
