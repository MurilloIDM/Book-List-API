import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (e) {
    return;
  }

  await fs.promises.unlink(filename);
};
