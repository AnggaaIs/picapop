/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Region {
  bounds: Bounds;
  maskCanvas: HTMLCanvasElement;
}

export async function replaceBlackWithImages(
  templatePath: string,
  replacementImagePaths: string[]
): Promise<string> {
  try {
    const templateImage = await loadImage(templatePath);
    const { width, height } = templateImage;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    ctx.drawImage(templateImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);

    const replacementImages = await Promise.all(
      replacementImagePaths.map((path) => loadImage(path))
    );

    const regions = findBlackRegionsWithFloodFill(imageData, width, height);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext("2d");

    if (!outputCtx) {
      throw new Error("Could not get output canvas context");
    }

    outputCtx.drawImage(templateImage, 0, 0);

    makeBlackAreasTransparent(outputCtx, width, height);

    await placeImagesInRegions(
      regions,
      replacementImages,
      width,
      height,
      outputCtx
    );

    const dataUrl = outputCanvas.toDataURL("image/png");
    return dataUrl;
  } catch (error) {
    console.error("replaceBlackWithImages failed:", error);
    throw error;
  }
}

function makeBlackAreasTransparent(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const outputData = ctx.getImageData(0, 0, width, height);
  const data = outputData.data;
  const length = data.length;

  for (let i = 0; i < length; i += 4) {
    if (!(data[i] | data[i + 1] | data[i + 2])) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(outputData, 0, 0);
}

async function placeImagesInRegions(
  regions: Region[],
  images: HTMLImageElement[],
  canvasWidth: number,
  canvasHeight: number,
  outputCtx: CanvasRenderingContext2D
): Promise<void> {
  const count = Math.min(regions.length, images.length);

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvasWidth;
  tempCanvas.height = canvasHeight;
  const tempCtx = tempCanvas.getContext("2d");

  if (!tempCtx) {
    throw new Error("Could not get temp canvas context");
  }

  const REGION_SIZE_THRESHOLD = 100000;
  const largeRegions: { region: Region; image: HTMLImageElement }[] = [];
  const smallRegions: { region: Region; image: HTMLImageElement }[] = [];

  for (let i = 0; i < count; i++) {
    const region = regions[i];
    const image = images[i];
    const width = region.bounds.maxX - region.bounds.minX;
    const height = region.bounds.maxY - region.bounds.minY;

    if (width * height > REGION_SIZE_THRESHOLD) {
      largeRegions.push({ region, image });
    } else {
      smallRegions.push({ region, image });
    }
  }

  await Promise.all(
    smallRegions.map(({ region, image }) =>
      processRegion(
        region,
        image,
        canvasWidth,
        canvasHeight,
        outputCtx,
        tempCanvas,
        tempCtx
      )
    )
  );

  for (const { region, image } of largeRegions) {
    await processRegion(
      region,
      image,
      canvasWidth,
      canvasHeight,
      outputCtx,
      tempCanvas,
      tempCtx
    );
  }
}

async function processRegion(
  region: Region,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  outputCtx: CanvasRenderingContext2D,
  tempCanvas: HTMLCanvasElement,
  tempCtx: CanvasRenderingContext2D
): Promise<void> {
  try {
    const width = region.bounds.maxX - region.bounds.minX - 2;
    const height = region.bounds.maxY - region.bounds.minY - 2;

    if (width <= 0 || height <= 0) return;

    const maskData = createOptimizedMask(region, canvasWidth, canvasHeight);

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

    const imgRatio = image.width / image.height;
    const boxRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > boxRatio) {
      drawWidth = height * imgRatio;
      drawHeight = height;
    } else {
      drawHeight = width / imgRatio;
      drawWidth = width;
    }

    offsetX = (width - drawWidth) / 2;
    offsetY = (height - drawHeight) / 2;

    tempCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    applyMaskAndDraw(outputCtx, region, maskData, canvasWidth, tempCanvas);
  } catch (error) {
    console.error("Error processing region:", error);
  }
}

function createOptimizedMask(
  region: Region,
  canvasWidth: number,
  canvasHeight: number
): Uint8Array {
  const maskCtx = region.maskCanvas.getContext("2d");
  if (!maskCtx) {
    throw new Error("Could not get mask canvas context");
  }

  const maskData = maskCtx.getImageData(0, 0, canvasWidth, canvasHeight);
  const { minX, minY, maxX, maxY } = region.bounds;
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  // Create a bitmap to store the mask
  const bitmapSize = (width * height + 7) >>> 3;
  const bitmap = new Uint8Array(bitmapSize);

  // Convert the mask data to a bitmap
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const localX = x - minX;
      const localY = y - minY;
      const localIdx = localY * width + localX;
      const byteIndex = localIdx >>> 3;
      const bitPosition = localIdx & 7;

      const idx = (y * canvasWidth + x) * 4;
      if (maskData.data[idx + 3] > 0) {
        bitmap[byteIndex] |= 1 << bitPosition;
      }
    }
  }

  return bitmap;
}

function applyMaskAndDraw(
  outputCtx: CanvasRenderingContext2D,
  region: Region,
  maskData: Uint8Array,
  _canvasWidth: number,
  tempCanvas: HTMLCanvasElement
): void {
  const { minX, minY, maxX, maxY } = region.bounds;
  const width = maxX - minX + 1;

  outputCtx.save();
  outputCtx.beginPath();

  for (let y = minY; y <= maxY; y++) {
    let lastX = -1;
    let currentRun = 0;

    for (let x = minX; x <= maxX; x++) {
      const localX = x - minX;
      const localY = y - minY;
      const localIdx = localY * width + localX;
      const byteIndex = localIdx >>> 3;
      const bitPosition = localIdx & 7;

      if (maskData[byteIndex] & (1 << bitPosition)) {
        if (lastX === x - 1) {
          currentRun++;
        } else {
          if (currentRun > 0) {
            outputCtx.rect(lastX - currentRun + 1, y, currentRun, 1);
          }
          lastX = x;
          currentRun = 1;
        }
      }
    }

    if (currentRun > 0) {
      outputCtx.rect(lastX - currentRun + 1, y, currentRun, 1);
    }
  }

  outputCtx.clip();
  outputCtx.drawImage(tempCanvas, minX, minY);
  outputCtx.restore();
}

function findBlackRegionsWithFloodFill(
  imageData: ImageData,
  width: number,
  height: number
): Region[] {
  const data = imageData.data;
  const regions: Region[] = [];
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height * 2);
  let queueStart = 0;
  let queueEnd = 0;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = y * width + x;
      const idx = pixelIndex * 4;

      if (
        !(data[idx] | data[idx + 1] | data[idx + 2]) &&
        !visited[pixelIndex]
      ) {
        const bounds: Bounds = { minX: x, maxX: x, minY: y, maxY: y };

        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d");

        if (!maskCtx) {
          throw new Error("Could not get mask canvas context");
        }

        queue[queueEnd++] = x;
        queue[queueEnd++] = y;
        visited[pixelIndex] = 1;
        maskCtx.fillRect(x, y, 1, 1);

        while (queueStart < queueEnd) {
          const cx = queue[queueStart++];
          const cy = queue[queueStart++];

          bounds.minX = Math.min(bounds.minX, cx);
          bounds.maxX = Math.max(bounds.maxX, cx);
          bounds.minY = Math.min(bounds.minY, cy);
          bounds.maxY = Math.max(bounds.maxY, cy);

          for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nPixelIndex = ny * width + nx;
              const nIdx = nPixelIndex * 4;

              if (
                !(data[nIdx] | data[nIdx + 1] | data[nIdx + 2]) &&
                !visited[nPixelIndex]
              ) {
                queue[queueEnd++] = nx;
                queue[queueEnd++] = ny;
                visited[nPixelIndex] = 1;
                maskCtx.fillRect(nx, ny, 1, 1);
              }
            }
          }
        }

        queueStart = queueEnd = 0;

        if (bounds.maxX - bounds.minX > 5 && bounds.maxY - bounds.minY > 5) {
          regions.push({ bounds, maskCanvas });
        }
      }
    }
  }

  regions.sort((a, b) => {
    const areaA =
      (a.bounds.maxX - a.bounds.minX) * (a.bounds.maxY - a.bounds.minY);
    const areaB =
      (b.bounds.maxX - b.bounds.minX) * (b.bounds.maxY - b.bounds.minY);
    return areaB - areaA;
  });

  return regions;
}
