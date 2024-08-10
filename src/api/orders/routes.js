require("dotenv").config();
const ORDERS_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/orders`;
export const createNewPurchase = async (purchaseData) => {
  console.log(purchaseData);
  try {
    const response = await fetch(`${ORDERS_URL}/newOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    });

    if (!response.ok) {
      throw new Error("Failed to create a new purchase");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const fetchClientPurchases = async (clientId) => {
  try {
    const response = await fetch(`${ORDERS_URL}/clientOrders/${clientId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch purchases for the client");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const fetchBrandPurchases = async (brandId) => {
  try {
    const response = await fetch(`${ORDERS_URL}/brandSales/${brandId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch purchases for the brand");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const markProductAsDelivered = async (purchaseId, productId) => {
  try {
    const response = await fetch(`${ORDERS_URL}/deliveredProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purchaseId, productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the delivery status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
