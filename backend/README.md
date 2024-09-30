## 1. package.json 中的 dependencies 與 devDependencies 分別是什麼？

- **dependencies**: 指的是專案在運行時所需要的套件，這些套件會被安裝在 `production` 環境中，例如 `express`。使用 `npm install express` 時，會自動將它加入 `dependencies`。

  
- **devDependencies**: 指的是在開發過程中所需要的套件，這些套件不需要在 `production` 環境中存在。例如，測試工具或打包工具，可以使用 `npm install <package> --save-dev` 將它們加入 `devDependencies`。

```bash
npm install express --save-dev
```

```json
"devDependencies": {
    "express": "^4.21.0"
  },
  "dependencies": {
    "dotenv": "^16.4.5"
  }
```

## 2. package.json 中的 scripts 這個區塊怎麼用？

- `scripts` 區塊定義了一些可以透過 `npm run <script>` 執行的命令。常見的有 `start`、`test`、`dev`等命令。例如，在 `package.json` 中，可以這樣設定：

    ```json
    "scripts": {
      "start": "node app.js"
    }
    ```
    然後：

    ```bash
    我得名字@MacBook-Air backend % npm start

    > backend@1.0.0 start
    > node app.js

    Server is listening on port 3000
    ```


    這樣就可以使用 `npm run start` 來啟動伺服器。

## 3. Port number 要怎麼以環境變數來設定？

- 我們可以使用 `process.env.PORT` 來取得環境變數中的 port number，這樣可以避免將 port 寫死在程式中。首先，安裝 dotenv 來處理環境變數：

    ```bash
    npm install dotenv
    ```

- 然後在 `app.js` 中加上 dotenv 設定，並透過環境變數來設定 port：

    ```javascript
    require('dotenv').config();
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    ```

- 在專案根目錄新增 `.env` 檔案，並設定 port：

    ```plaintext
    PORT=4000
    ```

    ```bash
    chuang@ThomasdeMacBook-Air backend % npm start         

    > backend@1.0.0 start
    > node app.js

    Server is listening on port 4000
    ```

## 4. 哪些檔案應該要被放上 GitHub repo？描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？

- **應上傳的檔案**：
    - `app.js`: 伺服器的主程式檔案，負責定義伺服器邏輯。
    - `package.json` & `package-lock.json`: 定義專案依賴的套件，確保團隊成員可以在安裝時獲得相同版本的套件。

- **不應上傳的檔案**：
    - `node_modules/`: 這是套件的安裝目錄，裡面的內容可以透過 `package.json` 自動安裝，不需要上傳。
    - `.env`: 包含環境變數的檔案，這通常是敏感資訊，不應該被上傳。如`API_KEY`: 不然會被拿去調用很多資料，荷包會哭。

    **決策要素**：應上傳與專案邏輯直接相關的檔案，而第三方套件或敏感資訊則不應上傳。可以使用 `.gitignore` 檔案來排除不應上傳的內容。

## 5. 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？

- **CJS (CommonJS)**: 使用 `require` 和 `module.exports` 是 Node.js 預設的模組系統，適用於較老的 JavaScript 版本。範例如下：

    ```javascript
    const express = require('express');
    module.exports = app;
    ```

- **ESM (ECMAScript Module)**: 是現代 JavaScript 中的標準模組系統，使用 `import` 和 `export`。必須在 `package.json` 中加入 `"type": "module"` 才能使用 ESM： （常常忘記）

    ```javascript
    import express from 'express';
    export default app;
    ```

## 進階題

1. **localhost 是什麼？**
   - `localhost` 是指本機伺服器或本地端電腦，它的 IP 位址通常是 `127.0.0.1`。當我們在瀏覽器中訪問 `http://localhost:3000`，就是連接到本機電腦上運行的伺服器。
  
  *問題：我有時候連Lab的vpn跑React，Log說Run on 3000，但他會一直轉圈，直到我用`ipconfig`確定Lab網路`http://10.XX.XX.XX:3000/`（有點忘記）就可以跑，我不知道要怎麼查這問題。*

1. **curl 是什麼？**
   - `curl` 是一個命令行工具，用於與伺服器進行資料傳輸。可以用它來測試 HTTP 請求，像這樣測試伺服器：

     ```bash
     curl http://localhost:3000/
     ```

   - 常用參數：
     - `-X <HTTP方法>`：指定 HTTP 請求方法（如 GET、POST）。
     - `-d <資料>`：傳送資料。
     - `-H <標頭>`：指定 HTTP 標頭。
   
   - e.g.
  
    ```bash
    我的名字@MacBook-Air backend % curl http://localhost:4000/ -X GET
    Hello World!%                                                                                                                                   
    我的名字@MacBook-Air backend % curl http://localhost:4000/ -X POST
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Error</title>
    </head>
    <body>
    <pre>Cannot POST /</pre>
    </body>
    </html>
    `` 

## 設定環境

- 要記得在根目錄創建 `.env` 檔案來設定環境變數，並確保 `.gitignore` 檔案中排除 `.env` 檔案。
- 要注意：不小心推到了不要以為重推就沒事了，要記得刪掉！！

