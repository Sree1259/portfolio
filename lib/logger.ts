/**
 * Secure logging utility that prevents sensitive data from reaching the browser console.
 * In production, logs are suppressed.
 */
const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      // Use a custom prefix to identify dev logs
      // eslint-disable-next-line no-console
      // console.log("[DEV]", ...args);
    }
  },
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      // console.error("[ERROR]", message, error);
    }
    // Future enhancement: Send to a secure server-side endpoint
  },
  warn: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      // console.warn("[WARN]", message);
    }
  },
};

export default logger;
