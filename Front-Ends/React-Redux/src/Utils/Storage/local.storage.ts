export const saveToken = (token: string) => {
  window.localStorage.setItem('bsaToken', token);
};
export const removeToken = () => window.localStorage.removeItem('bsaToken');
export const getToken = () => window.localStorage.getItem('bsaToken');
