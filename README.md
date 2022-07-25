## 开发须知

**功能开发不要在主分支上推送，拉去后新建分支，推送前拉取代码，处理冲突！！**

## 预备工作

全局安装 commitizen 
```
npm install -g commitizen@4.2.4
```

VScode插件，有其他同功能插件可选择性安装：
* ESLint
* ESLint Chinese Rules：规范中文提示
* Prettier - Code …… ：自动格式化
* Volar
* Path Intellisense：路径解析
* Auto Import：自动导入
* koroFileHeader：函数注释
* Code Spell Checker：拼写检查


settings.json 个人设置
```json
{
  // 添加 vue 支持
  "eslint.validate": ["javascript", "html", "vue", "typescript"],
  "eslint.options": {
    "extensions": [".js", ".vue", ".ts"]
  },
  // 每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": false
  },

    /*  prettier的配置 */
  "prettier.printWidth": 120, // 超过最大值换行
  "prettier.tabWidth": 2, // 缩进字节数
  "prettier.useTabs": false, // 缩进不使用tab，使用空格
  "prettier.semi": false, // 句尾添加分号
  "prettier.singleQuote": true, // 使用单引号代替双引号
  "prettier.proseWrap": "preserve", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "prettier.htmlWhitespaceSensitivity": "ignore", // 指定HTML文件的全局空白区域敏感度。
  "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
  "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（以ES5标准）

  // 默认格式化程序
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.quickSuggestions": { "strings": true },
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 自动导入
  "autoimport.filesToScan": "**/*.{vue,ts,tsx,js}",
  "autoimport.showNotifications": true,
  // 路径解析
  "path-intellisense.mappings": {
    "components": "${workspaceRoot}/src/components",
    "@": "${workspaceRoot}/src"
  },
  "path-intellisense.extensionOnImport": true,
  "path-intellisense.autoTriggerNextSuggestion": true,
  "path-intellisense.showHiddenFiles": true,
  "path-intellisense.autoSlashAfterDirectory": true,
}
```