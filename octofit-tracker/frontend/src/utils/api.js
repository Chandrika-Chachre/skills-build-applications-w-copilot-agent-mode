const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return '/api';
};

export const fetchResource = async (resourceName) => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${resourceName}/`);

  if (!response.ok) {
    throw new Error(`Failed to load ${resourceName}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};
