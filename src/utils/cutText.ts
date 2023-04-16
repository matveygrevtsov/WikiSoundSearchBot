const TEXT_MAX_LENGTH = 300;

/**
 * Обрезает текст, оставляя первые 300 символов до последней дочки.
 * @param text - текст, который будет обрезан.
 */
export function cutText(text: string): string {
  let result = text.replaceAll("\n", " ");
  if (result.length <= TEXT_MAX_LENGTH) return text;
  result = result.slice(0, TEXT_MAX_LENGTH);
  const indexOfLastDot = result.lastIndexOf(".");
  if (indexOfLastDot < TEXT_MAX_LENGTH / 2) return result;
  return result.slice(0, indexOfLastDot);
}
