import React from "react";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { socialMediaAccounts } from "@/types/global";
import { FormatDateTypes } from "@/types";

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


export function getGitHubUsername(socialMediaArray: socialMediaAccounts[]) {
  const githubAccount = socialMediaArray.find(account => account.platform === "GitHub");

  if (githubAccount) {
      // Extract the GitHub username from the account link
      return githubAccount.account_link.split("https://github.com/")[1] || null;
  }

  return null;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + 'M';
  } else if (n >= 1000) {
    return (n / 1000).toFixed(1) + 'K';
  } else {
    return n.toString();
  }
}

export function formatDate(params: FormatDateTypes): string {
  const { dateString, type} = params;
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const monthName = months[date.getMonth()];

  if (type === "joinedAt") {
    return `Joined - ${monthName} ${year}`;
  } else if (type === "createdAt") {
    return `Created at ${monthName} ${day}, ${year}`;
  } else if (type === "updatedAt") {
    return `Updated at ${monthName} ${day}, ${year}`;
  } else {
    return `${year}-${month}-${day}`;
  }
}
