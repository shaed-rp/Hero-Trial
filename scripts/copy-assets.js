const fs = require('fs-extra');
const path = require('path');

async function copyAssets() {
  try {
    const standalone = path.join(process.cwd(), '.next', 'standalone');

    // Ensure standalone directory exists
    await fs.ensureDir(standalone);

    // Copy public directory
    const publicDir = path.join(process.cwd(), 'public');
    const publicTarget = path.join(standalone, 'public');
    if (fs.existsSync(publicDir)) {
      console.log('Copying public directory...');
      await fs.copy(publicDir, publicTarget);
    }

    // Copy data directory
    const dataDir = path.join(process.cwd(), 'data');
    const dataTarget = path.join(standalone, 'data');
    if (fs.existsSync(dataDir)) {
      console.log('Copying data directory...');
      await fs.copy(dataDir, dataTarget);
    }

    // Copy server.js
    const serverFile = path.join(process.cwd(), 'server.js');
    const serverTarget = path.join(standalone, 'server.js');
    if (fs.existsSync(serverFile)) {
      console.log('Copying server.js...');
      await fs.copy(serverFile, serverTarget);
    }

    console.log('✓ Assets copied successfully');
  } catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
  }
}

copyAssets();