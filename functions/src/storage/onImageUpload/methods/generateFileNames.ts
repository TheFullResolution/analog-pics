import { SharedTypes } from '../../../index';

interface FilesInterface {
  thumbName: string;
  size: number;
  type: SharedTypes.ImageSizeTypes;
  format: SharedTypes.ImageFormatsTypes;
}

export type FilesArray = FilesInterface[];

interface GenerateFileNames {
  sizes: SharedTypes.ImageSizesType;
  newFileName: string;
  formats: SharedTypes.ImageFormatsTypes[];
}

export const generateFileNames = ({
  sizes,
  newFileName,
  formats,
}: GenerateFileNames): FilesArray => {
  return formats.reduce((previousArray, format) => {
    const files = Object.entries(sizes).map(([key, value]) => ({
      thumbName: `${key}-${newFileName}.${format}`,
      size: value,
      type: key as SharedTypes.ImageSizeTypes,
      format,
    }));

    return [...previousArray, ...files];
  }, [] as FilesArray);
};
