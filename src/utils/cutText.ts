/**
 * Обрезает текст, оставляя первые 300 символов до последней дочки.
 * @param text - текст, который будет обрезан.
 */
export function cutText(text: string): string {
  let result = text.replaceAll("\n", " ");
  if (result.length <= 300) return text;
  result = result.slice(0, 300);
  const indexOfLastDot = result.lastIndexOf(".");
  if (indexOfLastDot === -1) return result;
  return result.slice(0, indexOfLastDot);
}
