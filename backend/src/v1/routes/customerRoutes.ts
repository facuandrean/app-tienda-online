import express from 'express';
import { customerController } from '../../controllers/customerController';
import { checkRole } from '../../middlewares/checkRole';
import { verifyToken } from '../../middlewares/auth';
import { checkOwnership } from '../../middlewares/checkOwnership';
import { customerSchema, customerUpdateSchema } from '../../schemas/customerSchema';
import { validateBody } from '../../middlewares/validateBody';

const customerRoutes = express.Router();

customerRoutes.get("/", verifyToken, checkRole(["Admin"]), customerController.getAllCustomers);
customerRoutes.get("/:customerId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, customerController.getCustomerById);
customerRoutes.post("/", verifyToken, checkRole(["Admin"]), validateBody(false, customerUpdateSchema, customerSchema), customerController.postCustomer);
customerRoutes.patch("/:customerId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, validateBody(true, customerUpdateSchema, customerSchema), customerController.putCustomer);
customerRoutes.delete("/:customerId", verifyToken, checkRole(["Admin"]), customerController.deleteCustomer);

export default customerRoutes;