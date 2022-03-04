import './styles/reset.css'
import './styles/index.css'
import { useState } from 'react'

import initialStoreItems from './store-items'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/

export default function App() {
  const [storeItem, setStoreItem] = useState(initialStoreItems)
  const [cartItem, setCartItem] = useState([])

  const renderStoreItem = initialStoreItems => {
    return initialStoreItems.map(storeItem => {
      return (
        <li>
          <div className="store--item-icon">
            <img
              src={`/assets/icons/${storeItem.id}.svg`}
              alt={storeItem.name}
            />
          </div>
          <button onClick={() => addItemToCart(storeItem)} className="button">
            Add to cart
          </button>
        </li>
      )
    })
  }

  const addItemToCart = storeItem => {
    cartItem.find(cartItem => cartItem.id === storeItem.id)
    setCartItem([...cartItem, { ...storeItem, quantity: 1 }])
    console.log(cartItem)
  }

  const decrementQuantityInCart = storeItem => {
    setCartItem(
      cartItem.map(cartItem =>
        cartItem.id === storeItem.id
          ? { ...cartItem, quantity: storeItem.quantity-- }
          : cartItem
      )
    )
  }

  const incrementQuantityInCart = storeItem => {
    setCartItem(
      cartItem.map(cartItem =>
        cartItem.id === storeItem.id
          ? { ...cartItem, quantity: storeItem.quantity++ }
          : cartItem
      )
    )
  }

  const renderCartItem = () => {
    return cartItem.map(item => {
      return (
        <li>
          <img
            className="cart--item-icon"
            src={`/assets/icons/${item.id}.svg`}
            alt={item.name}
          />
          <p>{item.name}</p>
          <button onClick = {() => decrementQuantityInCart(storeItem)} className="quantity-btn remove-btn center">
            -
          </button>
          <span className="quantity-text center">{item.quantity}</span>
          <button
            onClick={() => incrementQuantityInCart(storeItem)}
            className="quantity-btn add-btn center"
          >
            +
          </button>
        </li>
      )
    })
  }

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {renderStoreItem(initialStoreItems)}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">{renderCartItem()}</ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£0.00</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
