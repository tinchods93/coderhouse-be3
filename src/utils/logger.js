class Logger {
  constructor() {
    this.logs = [];
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

const logger = new Logger();
export default logger;
