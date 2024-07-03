import { uid } from "uid";

function generateUniqueEmail(fullname, domain = "@gmail.com") {
  // Maxsus belgilarni olib tashlash
  const normalizedFullname = fullname.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  // Ismlar orasidagi bo'sh joylarni olib tashlash
  const nameParts = normalizedFullname.split(/\s+/);
  // Ismlar qismi
  const emailName = nameParts.join("").toLowerCase();

  let counter = uid();

  let uniqueEmail = `${emailName}${counter}${domain}`;

  return uniqueEmail;
}

function generatePassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export { generateUniqueEmail, generatePassword };
