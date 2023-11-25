interface LoggingErrorOptions extends ErrorOptions {
  [key: string]: unknown;
}

class LoggingError extends Error {
  constructor(message?: string, structuredOptions?: LoggingErrorOptions) {
    super(message, structuredOptions);

    if (structuredOptions != null && typeof structuredOptions === 'object') {
      const { cause, ...causelessOptions } = structuredOptions;
      Object.assign(this, causelessOptions);
    }
  }
}

export default LoggingError;
