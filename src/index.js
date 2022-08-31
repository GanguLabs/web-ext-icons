import rimraf from "rimraf";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const create = (sourceFile, destinationPath, s) => {
    const fileName = path.parse(sourceFile).name;
    const fileExt = path.parse(sourceFile).ext;
    new Promise((rs, rj) => {
        sharp(sourceFile)
            .rotate()
            .resize(s, s)
            .toFile(`${destinationPath}/${fileName}x${s}${fileExt}`)
            .then((d) => rs())
            .catch((e) => {
                rj(e);
            });
    });
}

export async function resize(sourceFile, destinationPath, sizes) {
    destinationPath = path.join(destinationPath, "web-ext-icons")
    await new Promise((rs, rj) =>
        rimraf(destinationPath, { disableGlob: true }, () => rs())
    );
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }
    await Promise.all(sizes.map((s) => create(sourceFile, destinationPath, s)))
        .then(
            console.log("Resized files to this location: " + destinationPath)
        );
};
