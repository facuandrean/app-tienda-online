import express from "express";

import productRoutes from "./v1/routes/productRoutes";
import categoryRouter from "./v1/routes/categoryRoutes";
import routerProductCategories from "./v1/routes/productCategoriesRoutes";
import userRouter from "./v1/routes/userRoutes";
import customerRouter from "./v1/routes/customerRoutes";
import config from "./config";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

// Public routes.
app.use("/api/v1/users", userRouter);

// Private routes.
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/product-categories", routerProductCategories);
app.use("/api/v1/customers", customerRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port 3000. http://localhost:${config.port}`);
});

export default app;