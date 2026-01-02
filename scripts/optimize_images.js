
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src/assets/xp');
const filesToOptimize = [
    { name: 'wallpaper.png', quality: 95 },
    { name: 'xplogo.png', quality: 95 }
];

async function optimize() {
    console.log('Starting optimization...');

    for (const file of filesToOptimize) {
        const inputPath = path.join(assetsDir, file.name);
        const outputPath = inputPath.replace('.png', '.webp');

        try {
            if (fs.existsSync(inputPath)) {
                await sharp(inputPath)
                    .webp({ quality: file.quality })
                    .toFile(outputPath);

                const originalStats = fs.statSync(inputPath);
                const newStats = fs.statSync(outputPath);

                console.log(`Optimized ${file.name}:`);
                console.log(`Original: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
                console.log(`WebP: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
                console.log(`Saved: ${((1 - newStats.size / originalStats.size) * 100).toFixed(1)}%\n`);
            } else {
                console.warn(`File not found: ${inputPath}`);
            }
        } catch (err) {
            console.error(`Error optimizing ${file.name}:`, err);
        }
    }
}

optimize();
