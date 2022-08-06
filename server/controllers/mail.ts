import path from "path";
import {Request, Response} from "express";
import nodemailer from "nodemailer";
import {Result, ValidationError, validationResult} from "express-validator";
import {IServerRequest, IServerResponse} from "../types/types";

// CONFIG
process.env["NODE_CONFIG_DIR"] = path.resolve("server", "config");
import cfg from "config";
const config = {
    host: cfg.get("host") as string,
    port: cfg.has("port") ? cfg.get("port") as number : 465,
    secure: cfg.has("secure") ? !!cfg.get("secure") : true,
    login: cfg.get("login") as string,
    password: cfg.get("password") as string,
    fromTitle: cfg.get("fromTitle") as string,
    toEmail: cfg.get("toEmail") as string,
    site: cfg.get("site") as string
}

export const send = async (req: Request<Record<string, string>, IServerResponse, IServerRequest>, res: Response<IServerResponse>) => {
    try {
        // Server validation
        const errors: Result<ValidationError> = validationResult(req);
        // check data errors
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        const {name, phone, message, email} = req.body;
        let transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.login,
                pass: config.password,
            },
        })

        let msg = `
            <p><b>Заявка с сайта <a href="https://${config.site}">${config.site}</a></b></p>
            <p><b>Имя:</b> ${name}</p>
            <p><b>Телефон:</b> ${phone}</p>
        `;
        if (email) msg += `<p><b>Email:</b> <a href=${`mailto:${email}`}>${email}</a></p>`;
        if (message) msg += `<p><b>Сообщение:</b> ${message}</p>`;

        await transporter.sendMail({
            from: `"${config.fromTitle}" <${config.login}>`,
            to: config.toEmail,
            subject: "Заявка с сайта",
            html: msg,
        })

        res
            .status(200)
            .json({ message: "Сообщение отправлено" });
    } catch (e) {
        res
            .status(500)
            .json({
                errors: [{
                    location: "body",
                    msg: "Попробуйте позже",
                    param: "app",
                    value: null
                }]
            });
    }
}
