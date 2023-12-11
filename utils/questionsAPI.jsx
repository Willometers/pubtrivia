export const getQuestion = async () => {
  try {
    const res = await fetch('https://the-trivia-api.com/api/questions?limit=10');
    return await res.json();
  } catch (err) {
    console.error('Failed to parse:', err);
    return null; // Return a default value or handle the error appropriately
  }
};