import { verifyJWT } from "../../utils/auth"; // Tu función de verificación JWT
import { connectToDatabase } from "../../utils/mongodb"; // Tu función de conexión a la base de datos

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = verifyJWT(token);

  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const { cart } = req.body;
  const { db } = await connectToDatabase();

  try {
    await db
      .collection("carts")
      .updateOne({ userId: user.id }, { $set: { cart } }, { upsert: true });
    res.status(200).send({ message: "Cart synced successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to sync cart" });
  }
}
