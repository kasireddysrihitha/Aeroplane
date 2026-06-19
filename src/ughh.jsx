import { useState } from "react";
 
function App() {
  const [cart] = useState([
    { id: 1, name: "Apple", price: 50, quantity: 2 },
    { id: 2, name: "Banana", price: 20, quantity: 3 },
    { id: 3, name: "Orange", price: 30, quantity: 1 },
  ]);
 
  // Derived state: computed during render, NOT stored in state
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity} = $
            {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </div>
  );
}
 
export default App;
