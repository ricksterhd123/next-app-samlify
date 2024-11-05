'use client';

export default async function fetcher (input, init) {
  const response = await fetch(input, init);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
}
