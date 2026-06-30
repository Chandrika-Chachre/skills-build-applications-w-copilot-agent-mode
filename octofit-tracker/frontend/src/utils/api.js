const getApiBaseUrl = (resourceName) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resourceName}/`;
  }

  return `/api/${resourceName}/`;
};

export const fetchResource = async (resourceName) => {
  const url = getApiBaseUrl(resourceName);
  const response = await fetch(url);

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
