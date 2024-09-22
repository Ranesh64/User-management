export const avatarLetter = (name) => {
  const arr = name.split(" ");
  const initials =
    arr.length >= 2
      ? arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase()
      : arr[0].charAt(0).toUpperCase();
  return initials;
};
