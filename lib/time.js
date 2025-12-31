export function getNow(request) {
  if (process.env.TEST_MODE === "1") {
    const testNow = request.headers.get("x-test-now-ms");
    if (testNow) {
      return Number(testNow);
    }
  }
  return Date.now();
}
