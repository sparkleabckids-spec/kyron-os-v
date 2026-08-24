# KYRON OS — Windows Quick Start & User Guide

KYRON OS provides a native Windows single-file installer executable (`KYRON-OS-Setup.exe`), desktop shortcuts, an automatic browser launcher, configuration wizard, and a safe uninstaller.

---

## 1. One-Click Installation (Windows Setup Executable)

1. Double-click **`KYRON-OS-Setup.exe`**.
2. **Choose Installation Directory**: Select your preferred installation location (default: `C:\Program Files\KYRON OS` or any custom folder).
3. Click **Install**.
4. The setup wizard automatically:
   - Installs all pre-compiled production binaries, frontend dashboard, and 14-stage content pipeline.
   - Creates a **Desktop shortcut** (`KYRON OS`).
   - Creates a **Start Menu folder** (`KYRON OS`) with Launch, Configure, Stop, and Uninstall shortcuts.
   - Registers in Windows **Installed Apps / Apps & Features**.
5. Click **Finish** (with "Launch KYRON OS" checked) to start immediately.

*Alternative portable setup*: You can also run `Install-KyronOS.bat` inside the folder.

---

## 2. Launching KYRON OS

- Double-click the **`KYRON OS`** shortcut on your Desktop or Start Menu.
- Or run **`Launch-KyronOS.bat`** (or `start.bat`).
- The launcher starts the production server, verifies health readiness, and **automatically opens your default web browser** to `http://localhost:3000`.
- *Note: If KYRON OS is already running, clicking the shortcut will immediately bring up the browser dashboard without starting duplicate server processes.*

---

## 3. Stopping KYRON OS

- Double-click **`Stop-KyronOS.bat`** (or `stop.bat`), or click **"Stop KYRON OS"** in your Start Menu.
- The server will acknowledge the graceful shutdown signal and cleanly terminate with zero orphan processes.

---

## 4. Configuring WordPress Credentials

- Double-click **`Configure-KyronOS.bat`** (or `configure.bat`), or click **"Configure KYRON OS"** in your Start Menu.
- The wizard allows you to securely view and update:
  - `WORDPRESS_URL`
  - `WORDPRESS_USERNAME`
  - `WORDPRESS_APP_PASSWORD`

---

## 5. Uninstalling KYRON OS & Data Protection

- Uninstall via Windows **Settings > Apps > Installed apps > KYRON OS > Uninstall** (or double-click `Uninstall-KYRON-OS.exe` in the install directory).
- **Persistent Data Protection**: The uninstaller asks whether you want to preserve your editorial memory, review queues, and WordPress settings:
  - **Yes (Keep Data)**: Safely archives your persistent data (`.env`, `human_review_queue.json`, `editorial_memory_*.json`) into `%USERPROFILE%\Documents\KYRON_OS_DATA_BACKUP\`.
  - **No (Delete All)**: Removes all application files and data cleanly.
