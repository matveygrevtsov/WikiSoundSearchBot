export function cutText(text: string): string {
  const result = text.replaceAll("\n", " ").slice(0, 300); // Удаляем символы переноса строки, отрезаем первые 300 символов.
  return result.slice(0, result.lastIndexOf(".")); // Обрезаем текст до последней точки.
}
