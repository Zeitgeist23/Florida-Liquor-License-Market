import "server-only";

export async function retryableFetch(
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
  attempts = 3
) {
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(input, init);
      if (![502, 503, 504].includes(response.status) || attempt === attempts - 1) return response;
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1) break;
    }

    await new Promise((resolve) => setTimeout(resolve, 150 * (attempt + 1)));
  }

  throw new Error(
    lastError instanceof Error && !/fetch failed|failed to fetch/i.test(lastError.message)
      ? lastError.message
      : "The secure FLLM account service could not be reached. Please try again."
  );
}
