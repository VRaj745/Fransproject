import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import products from "./data/products.json";
import reviews from "./data/reviews.json";

export default function App() {
  const [cart, setCart] = useState([]);
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleOrder = () => {
    const orderDetails = cart.map((item) => item.name).join(", ");
    window.location.href = `https://formspree.io/f/yourFormID?order=${encodeURIComponent(orderDetails)}`;
  };

  const toggleAdmin = () => {
    if (password === "fransadmin") {
      setAdminMode(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fresh Frans - Online Orders</h1>

      {!adminMode && (
        <>
          <h2 className="text-xl font-semibold mb-2">🛍 Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {products.map((product, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-green-700 font-bold mt-2">${product.price}</p>
                  <Button onClick={() => addToCart(product)} className="mt-2">Add to Cart</Button>
                  <a
                    href="https://buy.stripe.com/test_4gw8yN0S00XX3D6288"
                    className="block text-blue-600 text-sm mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Pay Now</a>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-2">🛒 Your Cart</h2>
          <ul className="mb-4">
            {cart.map((item, idx) => (
              <li key={idx}>- {item.name}</li>
            ))}
          </ul>
          {cart.length > 0 && <Button onClick={handleOrder}>Place Order</Button>}

          <h2 className="text-xl font-semibold mt-6 mb-2">🌟 Customer Reviews</h2>
          <div className="grid gap-4">
            {reviews.map((review, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <p className="italic">"{review.comment}"</p>
                  <p className="text-sm text-right">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mr-2"
            />
            <Button onClick={toggleAdmin}>Enter Admin Mode</Button>
          </div>
        </>
      )}

      {adminMode && (
        <div>
          <h2 className="text-2xl font-bold mb-4">🔐 Admin Panel</h2>
          <p>Orders are collected via Formspree. Check your connected email or backend sheet.</p>
          <p className="mt-2">Use Airtable or Google Sheets API here if needed in future for live order display.</p>
        </div>
      )}
    </div>
  );
}
