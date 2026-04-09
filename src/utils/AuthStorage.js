const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Save auth tokens to localStorage
 * @param {Object} tokens
 */
export const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

/**
 * Get auth tokens from localStorage
 * @returns {Object|null}
 */
export const getTokens = () => {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

/**
 * Remove auth tokens from localStorage
 */
export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Save user data to localStorage
 * @param {Object} user
 */
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {Object|null}
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const tokens = getTokens();
  return !!(tokens && tokens.access && tokens.access.token);
};

/**
 * Get access token
 * @returns {string|null}
 */
export const getAccessToken = () => {
  const tokens = getTokens();
  return tokens && tokens.access ? tokens.access.token : null;
};

/**
 * Get refresh token
 * @returns {string|null}
 */
export const getRefreshToken = () => {
  const tokens = getTokens();
  return tokens && tokens.refresh ? tokens.refresh.token : null;
};
