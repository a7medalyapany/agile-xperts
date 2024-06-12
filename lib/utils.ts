import React from "react";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

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


export function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function formatDate(dateString: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Joined - ${month} ${year}`;
}
