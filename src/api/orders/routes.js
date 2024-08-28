require("dotenv").config();
const ORDERS_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`;
import convertToSubcurrency from "@/lib/convertToSubcurrency";

export const createNewPurchase = async (purchaseData) => {
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

export const newPaymentIntent = async (purchaseData) => {
  const { amount, items, userId, userEmail } = purchaseData;
  console.log(items);
  if (amount && items.length > 0 && userId) {
    try {
      const response = await fetch(`${ORDERS_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          metadata: { items: JSON.stringify(items) },
          receipt_email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Solo retorna los datos
    } catch (error) {
      console.error(
        "Error fetching client secret:",
        error.message,
        error.stack
      );
    }
  } else {
    console.error("Invalid input: amount, items, or userId is missing");
  }
};

export const getPaymentIntent = async (paymentIntentId) => {
  try {
    const response = await fetch(
      `${ORDERS_URL}/get-payment-intent?payment_intent=${paymentIntentId}`
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data.metadata;
  } catch (error) {
    console.error("Error fetching PaymentIntent metadata:", error.message);
    return null;
  }
};

export const fetchClientSecret = async (paymentIntentId) => {
  try {
    const response = await fetch(
      `${ORDERS_URL}/getClientSecret?paymentIntentId=${paymentIntentId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clientSecret:", error);
    return null;
  }
};
