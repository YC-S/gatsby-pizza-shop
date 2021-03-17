import React from 'react'
import Img from 'gatsby-image'
import MenuItemStyles from '../styles/MenuItemStyles'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formateMoney from '../utils/formatMoney'

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id)
      return (
        <MenuItemStyles key={`${singleOrder.id}-${index}`}>
          <Img fluid={pizza.image.asset.fluid} />
          <h3>{pizza.name}</h3>
          <p>{formateMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}</p>
          <button
            type="button"
            className="remove"
            title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </MenuItemStyles>
      )
    })}
  </>
)

export default PizzaOrder
