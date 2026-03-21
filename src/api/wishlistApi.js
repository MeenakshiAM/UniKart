import { CART_SERVICE_URL } from "../config/serviceUrls";

const BASE_URL = `${CART_SERVICE_URL}/api`;

export const getWishlist = async (token) => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const toggleWishlist = async (productId, token) => {
  const res = await fetch(`${BASE_URL}/wishlist/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};