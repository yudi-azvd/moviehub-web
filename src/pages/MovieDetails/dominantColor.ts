/**
 * !!! "dominant color" uma ova. É a média
 *
 * Ideias para otimização:
 * 1. pegar apenas um pixel no meio da imagem
 * 2. pular em mútiplos de quatro (i+=4, i+=8, i++40...)
 *
 * Posso usar useCallback fora um React.FC? não precisa:
 *
 * const getDominantColor = useCallback(() => importedgGetDocminantColor(context))
 */
export const ggetDominantColor = (
  context: CanvasRenderingContext2D | undefined | null,
): string => {
  // referência
  // https://www.w3schools.com/tags/canvas_getimagedata.asp
  const width = 300;
  const height = 450;
  if (!context) {
    return '#555555';
  }

  const imageData = context.getImageData(0, 0, width, height);

  if (!imageData) {
    return '#555555';
  }

  let red = 0;
  let green = 0;
  let blue = 0;

  for (let i = 0; i < imageData.data.length; i += 400) {
    red += imageData.data[i];
    green += imageData.data[i + 1];
    blue += imageData.data[i + 2];
  }

  const total = ((width * height) / 400) * 4;
  const averageRed = Math.floor(red / total);
  const averageGreen = Math.floor(green / total);
  const averageBlue = Math.floor(blue / total);

  const rgb = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;

  return rgb;
};

export const ggetDominantColor2 = (
  context: CanvasRenderingContext2D | undefined | null,
): string => {
  const width = 300;
  const height = 450;
  if (!context) {
    return '#555555';
  }

  const imageData = context.getImageData(0, 0, width, height);

  if (!imageData) {
    return '#555555';
  }

  const middlePosition = imageData.data.length / 2;

  const r = imageData.data[middlePosition];
  const g = imageData.data[middlePosition + 1];
  const b = imageData.data[middlePosition + 2];

  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
};

export const ggetDominantColor3 = (
  context: CanvasRenderingContext2D | undefined | null,
): string => {
  const width = 300;
  const height = 450;
  if (!context) {
    return '#555555';
  }

  const imageData = context.getImageData(0, 0, width, height);

  if (!imageData) {
    return '#555555';
  }

  let red = 0;
  let green = 0;
  let blue = 0;
  for (let verticalOffset = 0; verticalOffset < height; verticalOffset += 1) {
    red += imageData.data[verticalOffset * width];
    green += imageData.data[verticalOffset * width];
    blue += imageData.data[verticalOffset * width];
  }

  const total = height;
  const averageRed = Math.floor(red / total);
  const averageGreen = Math.floor(green / total);
  const averageBlue = Math.floor(blue / total);

  const rgb = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
  return rgb;
};
