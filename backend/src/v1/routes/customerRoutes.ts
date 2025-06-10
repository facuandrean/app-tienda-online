import express from 'express';
import { customerController } from '../../controllers/customerController';
import { checkRole } from '../../middlewares/checkRole';
import { verifyToken } from '../../middlewares/auth';
import { checkOwnership } from '../../middlewares/checkOwnership';

const customerRoutes = express.Router();

customerRoutes.get("/", verifyToken, checkRole(["Admin"]), customerController.getAllCustomers);
customerRoutes.get("/:customerId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, customerController.getCustomerById);
customerRoutes.post("/", verifyToken, checkRole(["Admin"]), customerController.postCustomer);
customerRoutes.put("/:customerId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, customerController.putCustomer);
customerRoutes.delete("/:customerId", verifyToken, checkRole(["Admin"]), customerController.deleteCustomer);

export default customerRoutes;