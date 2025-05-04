/* eslint-disable @typescript-eslint/no-explicit-any */
export function createResponse(
  statusCode: number,
  message: string,
  data?: any
) {
  return {
    statusCode,
    success: statusCode >= 200 && statusCode < 300,
    message,
    ...(data !== undefined && { data }),
  };
}
