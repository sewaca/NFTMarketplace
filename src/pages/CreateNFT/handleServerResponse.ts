export interface IBlock {
  base64: string;
  id: string;
  width: number;
  height: number;
}
interface IImageInfo {
  width: number;
  height: number;
  cols: number;
  rows: number;
}

interface IServerResponse {
  blocks: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    base64: string;
  }>;
}
interface IAnswer {
  imageInfo: IImageInfo;
  blocks: Array<Array<IBlock>>;
}

type IHandleServerResponse = (res: IServerResponse) => IAnswer;

export const handleServerResponse: IHandleServerResponse = (res) => {
  let blocks: Array<Array<IBlock>> = [];
  let imageInfo: IImageInfo = {
    width: 0,
    height: 0,
    cols: 0,
    rows: 0,
  };

  res.blocks.forEach((block) => {
    if (block.x === 0) {
      imageInfo.width += block.w;
      imageInfo.cols++;
    }
    if (block.y === 0) {
      imageInfo.height += block.h;
      imageInfo.rows++;
    }

    if (blocks[block.x]) {
      blocks[block.x].push({
        id: Math.random().toString(16).slice(2, 15),
        base64: block.base64,
        width: block.w,
        height: block.h,
      });
    } else {
      blocks[block.x] = [
        {
          id: Math.random().toString(16).slice(2, 15),
          base64: block.base64,
          width: block.w,
          height: block.h,
        },
      ];
    }
  });
  return { imageInfo, blocks };
};
