import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to encode form data into URL parameters
export function encodeFormToURL(formData: Record<string, string>, baseUrl: string): string {
  const params = new URLSearchParams();
  
  // Add each form field to URL parameters
  for (const [key, value] of Object.entries(formData)) {
    // For required fields like title and problem, use empty string if not provided
    // Otherwise the URL parameters won't be detected by the Note page
    params.append(key, value);
  }
  
  // Add timestamp
  params.append('timestamp', new Date().toISOString());
  
  return `${baseUrl}?${params.toString()}`;
}

// Function to format date for display
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Copy text to clipboard
export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(() => {
          fallbackCopyToClipboard(text);
          resolve(true);
        });
    } else {
      fallbackCopyToClipboard(text);
      resolve(true);
    }
  });
}

// Fallback copy method for browsers that don't support clipboard API
function fallbackCopyToClipboard(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Make the textarea out of viewport
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
  
  document.body.removeChild(textArea);
}
