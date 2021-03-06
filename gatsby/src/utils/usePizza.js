import React, { useContext, useState } from 'react'
import OrderContext from '../components/OrderContext'
import attachNamesAndPrices from './attachNamesAndPrices'
import calculateOrderTotal from './calculateOrderTotal'
import formatMoney from './formatMoney'

const usePizza = ({ pizzas, values }) => {
  // 1. Create some state to hold our order
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  // 2. Make a function add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza])
  }

  // 3. Make a function remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ])
  }
  //  this function run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault()
    console.log(e)
    setLoading(true)
    setError(null)
    // setMessage('Go Eat!')

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    }
    // 4. Send this data the serverless function when they check out
    // TODO
    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = JSON.parse(await res.text())
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false)
      setError(text.message)
    } else {
      setLoading(false)
      setMessage('Success! Come on down for your pizza')
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  }
}

export default usePizza
