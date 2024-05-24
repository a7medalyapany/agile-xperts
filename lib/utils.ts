import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractNameFromEmail(email: string) {
  // Remove the domain part of the email
  let username = email.split('@')[0];
  
  // Replace common separators with spaces
  username = username.replace(/[._-]/g, ' ');
  
  // If the name is in "firstname.lastname" format, extract the first name
  const name = username.split(' ')[0];
  
  return name;
}
