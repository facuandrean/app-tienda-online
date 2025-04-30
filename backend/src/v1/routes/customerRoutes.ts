import express from 'express';
import { customerController } from '../../controllers/customerController';

const customerRoutes = express.Router();

customerRoutes.get("/", customerController.getAllCustomers);
// customerRoutes.get("/:customerId", customerController.getCustomerById);
// customerRoutes.post("/", customerController.postCustomer);
// customerRoutes.get("/:customerId", customerController.putCustomer);
// customerRoutes.get("/:customerId", customerController.deleteCustomer);

export default customerRoutes;