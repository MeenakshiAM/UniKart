import { CART_SERVICE_URL } from "../config/serviceUrls";

const BASE_URL = `${CART_SERVICE_URL}/api`;

export const addToCart = async (productId, quantity, priceAtTime, token) => {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity, priceAtTime }),
  });
  return res.json();
};

export const getCart = async (token) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const removeFromCart = async (productId, token) => {
  const res = await fetch(`${BASE_URL}/cart/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

export const clearCart = async (token) => {
  const res = await fetch(`${BASE_URL}/cart/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};