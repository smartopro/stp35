import path from "path";
import mailRouter from "./routes/mail";

// EXPRESS
import express from "express";
const app = express();
import helmet from "helmet";

import rateLimit from "express-rate-limit";

// CONFIG
process.env["NODE_CONFIG_DIR"] = path.resolve("server", "config");
import cfg from "config";

const config = {
    appPort: cfg.has("appPort") ? cfg.get("appPort") : 5020
}

// Bruteforce security
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 sec
    max: 4,
    message: {
        status: 429,
        message: "",
        errors: [{
            msg: "Попробуйте позже",
            location: "body",
            param: "app",
            value: null
        }]
    }
});
app.set('trust proxy', 1);
app.use("/api/", apiLimiter);

// app.use(express.json({  extended: true }));
app.use(express.json());
app.use(helmet());

// ROUTES
app.use("/api/mail", mailRouter);

async function start() {
    try {
        // LISTEN
        app.listen(config.appPort, () => {
            console.log("\x1b[32m\x1b[1m%s\x1b[0m", `Application started on port ${config.appPort}`);
        })
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}
start();
