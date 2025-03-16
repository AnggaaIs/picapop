export const applyGrayscale = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  context.putImageData(imageData, 0, 0);
};

export const applySepia = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
    data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
    data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
  }

  context.putImageData(imageData, 0, 0);
};

export const applyInvert = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  context.putImageData(imageData, 0, 0);
};

export const applySaturate = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  level = 2
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const { h, s, v } = rgbToHsv(r, g, b);
    const newS = Math.min(s * level, 1);

    const { r: newR, g: newG, b: newB } = hsvToRgb(h, newS, v);

    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }

  context.putImageData(imageData, 0, 0);
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
};

// Fungsi bantu untuk mengubah HSV kembali ke RGB
const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};
