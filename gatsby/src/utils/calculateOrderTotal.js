import React from 'react'
import calculatePizzaPrice from './calculatePizzaPrice'

const calculateOrderTotal = (order, pizzas) => {
  // loop over each item in the order
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === singleOrder.id)
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size)
  }, 0)
  return total
}

export default calculateOrderTotal
