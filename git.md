# Blob, Tree, Commit, Branch, Head 是什麼？

- **Blob**:
  - Blob 是 Git 中儲存檔案內容的物件（binary large object）。每個 Blob 對應一個檔案的內容，Git 以 SHA-1 的 hash 作為該 Blob 的名稱。
  - Blob 只儲存檔案的內容，並不包含檔案的名稱或路徑。

- **Tree**:
  - Tree 是 Git 中用來表示目錄結構的物件。Tree 包含了指向 Blob 或其他 Tree 的參照，並記錄檔案的名稱和檔案權限。
  - 一個 Tree 代表目錄中的一個快照，並能追蹤目錄中檔案和子目錄的變化。

- **Commit**:
  - Commit 是 Git 中的核心物件，表示專案的一個狀態快照。Commit 物件包含了指向 Tree 的指標，作者資訊、時間戳記，以及上一個 Commit 的參照（parent commit）。
  - Commit 可以被視為「儲存點」，它將某一時刻的檔案狀態儲存下來。

- **Branch**:
  - Branch 是 Git 中的一個指標，指向某一個 Commit。它允許你在同一個專案中建立多條不同的開發線。每次進行 Commit 時，分支的指標會更新到最新的 Commit。
  - 預設的主分支稱為 `master` 或 `main`。

- **HEAD**:
  - HEAD 是一個指標，指向目前所檢出的分支或 Commit。通常，HEAD 會指向某一個分支（例如 `main`），但它也可以指向特定的 Commit（稱為「分離 HEAD 狀態」）。

---

# .git 資料夾的變化

在 Git repository 中執行一些常見的操作（如 `git add`、`git commit`）時，可以觀察 `.git` 資料夾內的變化：

1. **git init**：
   - 建立一個空的 `.git` 資料夾，裡面包含基礎的檔案結構：
     - `HEAD`：指向目前檢出的分支
     - `refs/`：儲存分支與標籤的參照
     - `objects/`：儲存所有 Blob、Tree、Commit 物件
     - `config`：儲存 repository 的設定

2. **git add**：
   - 執行 `git add` 會將暫存檔案的 Blob 放入 `.git/objects` 資料夾。這些物件用檔案的 SHA-1 雜湊值來命名。

3. **git commit**：
   - Commit 會建立新的 Commit 物件，並更新 `.git/refs/heads` 中的分支指標（例如 `main`）以指向最新的 Commit。
   - `.git/logs` 也會更新，記錄每次 Commit 或分支移動的歷史。

4. **git checkout**：
   - 會更新 `.git/HEAD` 以指向目前檢出的分支或 Commit。
   - 如果切換到其他分支，`.git/refs/heads/` 中對應的檔案也會更新。

---

# Commit message 的撰寫風格

良好的 commit message 可以幫助日後的專案維護與回顧。常見的撰寫建議包括：

- **標題（Summary）**：
  - 應該簡潔明瞭，通常不超過 50 字元。
  - 用祈使句來描述變更，例如：`Add feature X`、`Fix bug in Y`。 (有些人希望具體修改了甚麼要明確說明)

### Commit message style（風格）建議：

- **風格一致性**：
  - 使用固定的風格撰寫 commit message，方便未來檢視歷史紀錄。像是可以參考 [Conventional Commits](https://www.conventionalcommits.org/) 規範，格式如下：
    ```
    <type>[optional scope]: <description>
    
    [optional body]
    
    [optional footer]
    ```
    - `type`：變更的類型（如 `feat`、`fix`、`chore`）
    - `scope`（可選）：影響的範圍或模組
    - `description`：簡短描述
