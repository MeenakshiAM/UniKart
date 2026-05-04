export const notifyCartUpdated = () => {
  window.dispatchEvent(new Event('cartUpdated'));
  window.dispatchEvent(new Event('storage'));
};

export const notifyWishlistUpdated = () => {
  window.dispatchEvent(new Event('wishlistUpdated'));
  window.dispatchEvent(new Event('storage'));
};

export const getStoredArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const getItemKey = (id) => {
  if (id === null || id === undefined) return '';
  return String(id);
};

export const getCartQuantity = (item) => {
  const quantity = Number(item?.quantity);
  return Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
};

export const getStoredCart = () => {
  const mergedCart = new Map();

  getStoredArray('cart').forEach((item) => {
    const key = getItemKey(item?.id);
    if (!key) return;

    const existingItem = mergedCart.get(key);
    const quantity = getCartQuantity(item);

    mergedCart.set(key, {
      ...existingItem,
      ...item,
      quantity: (existingItem?.quantity || 0) + quantity
    });
  });

  return Array.from(mergedCart.values());
};

export const getCartCount = () => {
  return getStoredCart().reduce((sum, item) => sum + getCartQuantity(item), 0);
};

export const addOrIncrementCartItem = (product) => {
  const productKey = getItemKey(product?.id);
  if (!productKey) return [];

  const cart = getStoredCart();
  const existingItemIndex = cart.findIndex((item) => getItemKey(item.id) === productKey);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex] = {
      ...cart[existingItemIndex],
      ...product,
      quantity: getCartQuantity(cart[existingItemIndex]) + 1
    };
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  notifyCartUpdated();
  return cart;
};

export const getStoredWishlist = (validProductIds) => {
  const validKeys = validProductIds
    ? new Set(validProductIds.map((id) => getItemKey(id)))
    : null;

  const seen = new Set();

  return getStoredArray('wishlist').filter((id) => {
    const key = getItemKey(id);
    if (!key || seen.has(key)) return false;
    if (validKeys && !validKeys.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const getWishlistCount = () => {
  return getStoredWishlist().length;
};

export const getStoredWishlistProducts = () => {
  return getStoredArray('wishlistProducts').filter((product) => getItemKey(product?.id));
};

export const toggleWishlistItem = (productOrId, validProductIds) => {
  const productId = typeof productOrId === 'object' ? productOrId?.id : productOrId;
  const productKey = getItemKey(productId);
  if (!productKey) return [];

  const wishlist = getStoredWishlist(validProductIds);
  const exists = wishlist.some((id) => getItemKey(id) === productKey);
  const nextWishlist = exists
    ? wishlist.filter((id) => getItemKey(id) !== productKey)
    : [...wishlist, productId];

  localStorage.setItem('wishlist', JSON.stringify(nextWishlist));

  if (typeof productOrId === 'object' && productOrId) {
    const cachedProducts = getStoredWishlistProducts();
    const cachedProduct = {
      ...productOrId,
      inStock: productOrId.inStock !== false
    };
    const nextCachedProducts = [
      ...cachedProducts.filter((product) => getItemKey(product.id) !== productKey),
      cachedProduct
    ];
    localStorage.setItem('wishlistProducts', JSON.stringify(nextCachedProducts));
  }

  notifyWishlistUpdated();
  return nextWishlist;
};
