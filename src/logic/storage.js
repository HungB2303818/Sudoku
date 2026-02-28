import { writeTextFile, readTextFile, exists, BaseDirectory } 
  from '@tauri-apps/plugin-fs'

const SAVE_FILE = "sudoku-save.json"

/**
 * Lưu trạng thái game
 */
export async function saveGameToFile(gameState) {
  try {
    await writeTextFile(
      SAVE_FILE,
      JSON.stringify(gameState, null, 2),
      { baseDir: BaseDirectory.AppData }
    )
    return true
  } catch (error) {
    console.error("Lỗi khi lưu game:", error)
    return false
  }
}

/**
 * Load trạng thái game
 */
export async function loadGameFromFile() {
  try {
    const fileExists = await exists(
      SAVE_FILE,
      { baseDir: BaseDirectory.AppData }
    )

    if (!fileExists) return null

    const content = await readTextFile(
      SAVE_FILE,
      { baseDir: BaseDirectory.AppData }
    )

    return JSON.parse(content)
  } catch (error) {
    console.error("Lỗi khi load game:", error)
    return null
  }
}