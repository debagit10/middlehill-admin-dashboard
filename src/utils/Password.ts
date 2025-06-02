function generateRandomPassword(length = 6) {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = lowerCase + numbers;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

export default generateRandomPassword;
