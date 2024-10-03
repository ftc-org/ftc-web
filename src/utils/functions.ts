export const truncateString = (str: string, maxlength: number) => {
  return str?.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
};

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
