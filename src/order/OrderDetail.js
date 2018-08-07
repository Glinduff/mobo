import React, { Component } from 'react'
import { getOrder } from '../api/orders';

export default class OrderDetail extends Component {

  state = {
    order: {
      service_id: this.props.match.params.serviceId
    },
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.match.params.serviceId !== prevState.service_id){
      return { serviceId: nextProps.match.params.serviceId};
   }
   else return null;
 }

  componentDidMount() {
    return getOrder(this.state.order.service_id).then(order => this.setState({order: order}))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.serviceId !== this.state.serviceId) {
      return getOrder(this.state.serviceId).then(order => this.setState({order: order}))
    }
  }

  render() {
    const {order} = this.state
    console.log(order)
    return (
      <div className="order-detail">
        
        {JSON.stringify(order)}
      </div>
    )
  }
}
