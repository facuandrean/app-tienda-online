import express from "express";

import productRouter from "./v1/routes/productRoutes";
import categoryRouter from "./v1/routes/categoryRoutes";
import productCategoriesRouter from "./v1/routes/productCategoriesRoutes";
import userRouter from "./v1/routes/userRoutes";
import customerRouter from "./v1/routes/customerRoutes";
import config from "./config";
import cookieParser from 'cookie-parser';
import shoppingCartRouter from "./v1/routes/shoppingCartRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Public routes.
app.use("/api/v1/users", userRouter);

// Private routes.
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/product-categories", productCategoriesRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/cart", shoppingCartRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port 3000. http://localhost:${config.port}`);
});

export default app;