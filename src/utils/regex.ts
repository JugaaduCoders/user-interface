export const validateEmail = (value: string) => {
  const regexText =
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])";

  const regex = new RegExp(regexText);

  return regex.test(value);
};

export const validatePassword = (password: string) => {
  // At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return regex.test(password);
};
