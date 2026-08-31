const API_BASE = "/api";

export const getAuthToken = (): string | null => {
  return localStorage.getItem("gode_million_token");
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem("gode_million_token", token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("gode_million_token");
};

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "An error occurred with your request.");
    }
    return data;
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}
