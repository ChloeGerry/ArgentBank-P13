export const generateSecretKey = (): string => {
  const uint8Array = window.crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...uint8Array));
};
