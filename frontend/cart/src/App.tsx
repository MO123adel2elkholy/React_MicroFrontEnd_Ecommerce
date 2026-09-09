import { useEffect, useState } from "react";
import "./App.css";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};


 const itemsx: CartItem[] = [
  { id: "p1", name: "Wireless Mouse", price: 29 , quantity: 1 },
  { id: "p2", name: "Mechanical Keyboard", price: 89 , quantity: 2},
  { id: "p3", name: "USB-C Hub", price: 45 , quantity: 3 },
  { id: "p4", name: "Monitor Stand", price: 39 , quantity: 4},
  { id: "p5", name: "Webcam HD", price: 59 , quantity: 5},
  { id: "p6", name: "Desk Lamp", price: 34 , quantity: 1 },
  { id: "p7", name: "HeadPhone", price: 100  , "quantity" : 6},
   { id: "p8", name: "speaker ", price: 150 , "quantity" : 7 }
];
function App() {
  const [items, setItems] = useState<CartItem[]>([]);


 

  const removeItem = (id: string) => {
    const next = itemsx.filter((item) => item.id !== id);

    setItems(next);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Cart MFE · standalone</p>
          <h1>Cart</h1>
        </div>
      </header>

      <main className="main">
        <section className="panel">
          <div className="panel-top">
            <h2>Your cart</h2>
            <span className="badge">Items: {itemsx.length}</span>
          </div>

          {itemsx.length === 0 ? (
            <p className="empty">Cart is empty. Add a product from Products.</p>
          ) : (
            <ul className="list">
              {itemsx.map((item) => (
                <li key={item.id} className="row">
                  <span>
                    {item.name} × {item.quantity} — $
                    {item.price * item.quantity}
                  </span>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 ? (
            <div className="footer">
              <strong>Total: ${100}</strong>
              <button type="button" className="secondary" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
