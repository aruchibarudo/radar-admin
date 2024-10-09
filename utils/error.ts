export function parseError(error: unknown): string {
  try {
    if (error instanceof Error) {
      const message = error.message

      if (message) {
        return JSON.parse(message).detail
      }
    }
  } catch (e) {
    console.error('Error parsing the error object:', e)
  }

  return String(error)
}
