import express from "express";

import productRoutes from "./v1/routes/productRoutes";
import config from "./config";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello World! This is the backend of the store.");
})

app.use("/api/v1/products", productRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port 3000. http://localhost:${config.port}`);
});

export default app;