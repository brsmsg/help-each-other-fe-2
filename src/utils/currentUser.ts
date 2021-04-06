export const getUserId = (): string | undefined => {
  const userJSON = localStorage.getItem('currentUser') as string;
  const user = JSON.parse(userJSON);
  return user?.id;
  // return '2';
};
