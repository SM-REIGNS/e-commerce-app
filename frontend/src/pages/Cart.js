import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart({ user, updateCartQty }) {
  const [cart, setCart] = React.useState([]);
  const nav = useNavigate();

  const load = async () => {
    try {
      const { data } = await api.cart.get();
      setCart(data.cart);
    } catch (e) {
      setCart([]);
    }
  };
  React.useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    let res  = await api.cart.remove({ productId: id });
    load();
    let cartList = [];
    res?.data?.cart.forEach((c) =>
      cartList.push({ product: c?.product?._id, quantity: c?.quantity || 0 })
    );
    localStorage.setItem("cart", JSON.stringify(cartList));
    updateCartQty();
  };
  const updateQty = async (id, qty) => {
    let res  = await api.cart.update({ productId: id, quantity: qty });
    load();
    let cartList = [];
    res?.data?.cart.forEach((c) =>
      cartList.push({ product: c?.product?._id, quantity: c?.quantity || 0 })
    );
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  const total = cart.reduce(
    (s, i) => s + (i.product?.price || 0) * i.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {!user && (
        <div>
          Please login to persist your cart across sessions.{" "}
          <button onClick={() => nav("/login")}>Login</button>
        </div>
      )}
      <div>
        {cart.length === 0 ? (
          <div>No items</div>
        ) : (
          cart.map((item) => (
            <div
              key={item.product._id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: 8,
              }}
            >
              <img
                src={item.product.image || "https://via.placeholder.com/80"}
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <div>{item.product.title}</div>
                <div>₹ {item.product.price}</div>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQty(item.product._id, e.target.value)}
                style={{ width: 60 }}
              />
              <button onClick={() => remove(item.product._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: 12 }}>Total: ₹ {total}</div>
    </div>
  );
}
