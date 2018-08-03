export function trowNewError (err) {
  throw new Error(err)
}

    /* let filteredOrdes = dates.filter(date => date.orders.some(order => order.service_id.toString() === this.state.search.toString()))
      .map(date => ({...date, orders: date.orders.filter(order => order.service_id.toString() === this.state.search.toString())}))
 */