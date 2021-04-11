export const getUserId = (): string | undefined => {
  const userJSON = localStorage.getItem('currentUser') as string;
  const user = JSON.parse(userJSON);
  return user?.id;
  // return '2';
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') as string);
};

export const updateLocalStorage = (key: string, newValue: string) => {
  const user = getUser();
  user[key] = newValue;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearStorage = () => {
  localStorage.removeItem('currentUser');
};
