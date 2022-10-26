// `npm run test` to run a test

// const rimraf = require("rimraf"); // rimraf is uninstalled
var fs = require("fs");
var path = require('path');
const sharp = require("sharp");

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

async function resize(sourceFile, destinationPath, sizes) {
    // console.log(path.resolve(sourceFile));
    // destinationPath = path.join(destinationPath, "web-ext-icons")

    // await new Promise((rs, rj) =>
    // uninstalling rimraf because all the files and folders in destination are being deleted without any prompt
    //     rimraf(destinationPath, { disableGlob: true }, () => rs())
    // );

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }
    await Promise.all(sizes.map((s) => create(sourceFile, destinationPath, s)))
        .then(
            console.log("Resized files to this location: " + path.resolve(destinationPath))
        );
};

module.exports = resize;
