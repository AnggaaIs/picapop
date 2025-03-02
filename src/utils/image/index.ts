/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadImage, createCanvas } from "canvas";
import { Dispatch, SetStateAction } from "react";

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Region {
  bounds: Bounds;
  maskCanvas: any;
}

export async function replaceBlackWithImages(
  templatePath: string,
  replacementImagePaths: string[],
  setProcessedImage: Dispatch<SetStateAction<string | null>>
) {
  try {
    const templateImage = await loadImage(templatePath);
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(templateImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Temukan semua region hitam menggunakan flood fill
    const regions = findBlackRegionsWithFloodFill(
      imageData as unknown as ImageData,
      canvas.width,
      canvas.height
    );

    regions.forEach((region, i) => {
      const width = region.bounds.maxX - region.bounds.minX + 1;
      const height = region.bounds.maxY - region.bounds.minY + 1;
      console.log(
        `Region ${i + 1}: ${width}x${height} at (${region.bounds.minX},${
          region.bounds.minY
        }) to (${region.bounds.maxX},${region.bounds.maxY})`
      );
    });

    const outputCanvas = createCanvas(canvas.width, canvas.height);
    const outputCtx = outputCanvas.getContext("2d");

    outputCtx.drawImage(templateImage, 0, 0);
    const outputData = outputCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const outData = outputData.data;

    for (let i = 0; i < outData.length; i += 4) {
      if (outData[i] === 0 && outData[i + 1] === 0 && outData[i + 2] === 0) {
        outData[i + 3] = 0;
      }
    }

    outputCtx.putImageData(outputData, 0, 0);

    for (
      let i = 0;
      i < Math.min(regions.length, replacementImagePaths.length);
      i++
    ) {
      try {
        const region = regions[i];
        const imagePath = replacementImagePaths[i];

        const replacementImage = await loadImage(imagePath);

        const maskData = region.maskCanvas
          .getContext("2d")
          .getImageData(0, 0, canvas.width, canvas.height);

        const width = region.bounds.maxX - region.bounds.minX - 2;
        const height = region.bounds.maxY - region.bounds.minY - 2;

        const tempCanvas = createCanvas(width, height);
        const tempCtx = tempCanvas.getContext("2d");

        const imgRatio = replacementImage.width / replacementImage.height;
        const boxRatio = width / height;

        let drawWidth, drawHeight;
        const scaleFactor = 1;

        if (imgRatio > boxRatio) {
          drawWidth = height * imgRatio * scaleFactor;
          drawHeight = height * scaleFactor;
        } else {
          drawHeight = (width / imgRatio) * scaleFactor;
          drawWidth = width * scaleFactor;
        }

        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        tempCtx.drawImage(
          replacementImage,
          offsetX,
          offsetY,
          drawWidth,
          drawHeight
        );

        outputCtx.save();
        outputCtx.beginPath();

        for (let y = region.bounds.minY; y <= region.bounds.maxY; y++) {
          for (let x = region.bounds.minX; x <= region.bounds.maxX; x++) {
            const idx = (y * canvas.width + x) * 4;
            if (maskData.data[idx + 3] > 0) {
              outputCtx.rect(x, y, 1, 1);
            }
          }
        }

        outputCtx.clip();

        outputCtx.drawImage(tempCanvas, region.bounds.minX, region.bounds.minY);
        outputCtx.restore();

        //eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    }

    const dataUrl = outputCanvas.toDataURL("image/png");
    setProcessedImage(dataUrl);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
}

function findBlackRegionsWithFloodFill(
  imageData: ImageData,
  width: number,
  height: number
): Region[] {
  const data = imageData.data;
  const regions: Region[] = [];
  const visited = new Array(width * height).fill(false);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (
        data[idx] === 0 &&
        data[idx + 1] === 0 &&
        data[idx + 2] === 0 &&
        !visited[y * width + x]
      ) {
        const bounds: Bounds = { minX: x, maxX: x, minY: y, maxY: y };

        const maskCanvas = createCanvas(width, height);
        const maskCtx = maskCanvas.getContext("2d");

        const stack: { x: number; y: number }[] = [{ x, y }];
        visited[y * width + x] = true;
        maskCtx.fillRect(x, y, 1, 1);

        while (stack.length > 0) {
          const current = stack.pop()!;
          const cx = current.x;
          const cy = current.y;

          // Update bounds
          bounds.minX = Math.min(bounds.minX, cx);
          bounds.maxX = Math.max(bounds.maxX, cx);
          bounds.minY = Math.min(bounds.minY, cy);
          bounds.maxY = Math.max(bounds.maxY, cy);

          const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ];

          for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = (ny * width + nx) * 4;

              if (
                data[nIdx] === 0 &&
                data[nIdx + 1] === 0 &&
                data[nIdx + 2] === 0 &&
                !visited[ny * width + nx]
              ) {
                stack.push({ x: nx, y: ny });
                visited[ny * width + nx] = true;
                maskCtx.fillRect(nx, ny, 1, 1);
              }
            }
          }
        }

        if (bounds.maxX - bounds.minX > 5 && bounds.maxY - bounds.minY > 5) {
          regions.push({
            bounds,
            maskCanvas,
          });
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
