import {useEffect, useRef} from "react";

export interface IServerError {
    value: string | null,
    msg: string,
    param: string,
    location: string
}

export interface IServerResponse {
    message?: string
    errors?: IServerError[]
}

export function isServerResponse(response: any): response is IServerResponse {
    if (typeof response.message !== "string") {
        return false;
    }
    return response.errors === undefined || (
        Array.isArray(response.errors) && response.errors.reduce(
            (acc: boolean, item: any) => acc && (typeof item.value === "string" || item.value === null) && typeof item.msg === "string" && typeof item.param === "string" && typeof item.location === "string",
            true
        )
    );
}

export const phoneToTel = (phone: string) => (phone[0] === "8" ? "" : "+") + phone.replaceAll(/\D/g, "");

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func: Function, wait: number, options: { leading?: boolean, trailing?: boolean }) {
    let context: any;
    let args: any[] | null;
    let result: any;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = Array.from(arguments);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

// Возвращает функцию, которая, пока она продолжает вызываться,
// не будет запускаться.
// Она будет вызвана один раз через N миллисекунд после последнего вызова.
// Если передано аргумент `immediate` (true), то она запустится сразу же при
// первом запуске функции.
export function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: ReturnType<typeof setTimeout> | null;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

export const capitalize = (str: string): string => `${str[0].toUpperCase()}${str.slice(1)}`;

export const getPageWidth = (): number => Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
);

export const getPageHeight = (): number => Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

export const loadScript = (function() {
    let scripts: Record<string, HTMLScriptElement> = {};

    return function(nameSpace: string, url: string) {
        return new Promise((resolve, reject) => {
            if (Object.keys(scripts).includes(nameSpace)) {
                resolve(null);
            } else {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.async = true;
                script.onload = resolve;
                script.onerror = script.onabort = reject;
                document.body.append(script);
                scripts[nameSpace] = script;
            }
        });
    }
})();

export async function request(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: Record<string, string | null> | null = null,
    headers: Record<string, string> = {}
) {
    let bodyStr: string | undefined;
    if (body) {
        bodyStr = JSON.stringify(body);
        headers["Content-Type"] = "application/json;charset=utf-8";
    }

    const response = await fetch(url, {method, headers, body: bodyStr});
    const data: IServerResponse = await response.json();

    if (!response.ok) {
        const error: IServerResponse = new Error();
        error.message = data.message || "Ошибка сервера. Попробуйте позже.";
        if (Array.isArray(data.errors) && data.errors.length !== 0) error.errors = data.errors;
        throw error;
    }

    return data;
}

export function withIDs<T = Record<string, any>>(objArray: T[]) {
    return objArray.map((item, idx) => ({ ...item, id: idx }));
}

export function usePrevious<T>(value: T): T {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref: any = useRef<T>();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
