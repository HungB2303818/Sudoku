// Thay đổi từ @tauri-apps/api sang các plugin tương ứng
import { save, open } from '@tauri-apps/plugin-dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';

export async function saveGameToFile(gameState) {
  try {
    const filePath = await save({
      filters: [{ name: 'Sudoku Game', extensions: ['json'] }]
    });
    
    if (filePath) {
      await writeTextFile(filePath, JSON.stringify(gameState));
      return true;
    }
  } catch (error) {
    console.error("Lỗi lưu file:", error);
    return false;
  }
}

export async function loadGameFromFile() {
  try {
    const selectedPath = await open({
      multiple: false,
      filters: [{ name: 'Sudoku Game', extensions: ['json'] }]
    });

    if (selectedPath) {
      const content = await readTextFile(selectedPath);
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Lỗi đọc file:", error);
    return null;
  }
}