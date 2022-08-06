import {Router} from "express";
const router = Router();

// Middleware
import checkErrors from "../middleware/checkErrors.middleware";

// Controllers
import {send} from "../controllers/mail";

router.post(
    "/send",
    checkErrors(),
    send
);

export default router;
