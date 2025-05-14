import express from 'express';
import { customerController } from '../../controllers/customerController';

const customerRoutes = express.Router();

customerRoutes.get("/", customerController.getAllCustomers);
customerRoutes.get("/:customerId", customerController.getCustomerById);
customerRoutes.post("/", customerController.postCustomer);
customerRoutes.put("/:customerId", customerController.putCustomer);
customerRoutes.delete("/:customerId", customerController.deleteCustomer);

export default customerRoutes;