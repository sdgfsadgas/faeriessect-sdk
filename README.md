# faeriessect

FaeriesSect插件开发SDK - 类型定义和运行时支持

## 📦 安装

```bash
npm install faeriessect
```

## 🚀 快速开始

```javascript
const faeriessect = require('faeriessect')

exports.activate = function(context) {
  // 注册命令
  const disposable = faeriessect.commands.registerCommand('hello', () => {
    faeriessect.window.showInformationMessage('Hello World!')
  })
  
  context.subscriptions.push(disposable)
}

exports.deactivate = function() {
  console.log('插件已停用')
}
```

## 📚 API文档

### Commands API
```javascript
faeriessect.commands.registerCommand('commandId', () => {})
```

### Window API
```javascript
faeriessect.window.showNotification({ title: '标题', body: '内容' })
faeriessect.window.showInformationMessage('信息')
```

### UI API
```javascript
faeriessect.ui.registerTopBarItem({
  id: 'my-button',
  type: 'button',
  label: '按钮',
  onClick: () => {}
})
```

### Events API（插件间通信）
```javascript
// 监听事件
faeriessect.events.on('user:login', (user) => {
  console.log('用户登录:', user)
})

// 发送事件
faeriessect.events.emit('user:login', { name: '张三' })
```

### StatusBar API（状态栏）
```javascript
const item = faeriessect.statusBar.createStatusBarItem('right', 100)
item.text = '$(sync) 同步中...'
item.tooltip = '正在同步'
item.show()
```

### System API
```javascript
const info = await faeriessect.system.getSystemInfo()
const value = await faeriessect.system.registry.getValue(key, name)
```

### Subprocess API
```javascript
const child = faeriessect.subprocess.spawn('./bin/app.exe', ['--port', '8080'])
child.onStdout(data => console.log(data))
child.onExit(code => console.log('退出:', code))
```

### FS API
```javascript
const content = await faeriessect.fs.readFile('/path/to/file')
await faeriessect.fs.writeFile('/path/to/file', 'content')
```

## 📖 完整文档

查看 [API参考文档](https://github.com/yourusername/faeriessect-sdk/blob/main/docs/API.md)

## 🔧 TypeScript支持

完整的TypeScript类型定义，自动智能提示：

```typescript
import type * as FaeriesSect from 'faeriessect'

const faeriessect = require('faeriessect') as typeof FaeriesSect

export function activate(context: FaeriesSect.PluginContext) {
  // 完整类型提示！
}
```

## 📝 示例

查看 [examples](https://github.com/yourusername/faeriessect-sdk/tree/main/examples) 目录

## 📄 License

MIT

## 🤝 贡献

欢迎提交Issue和PR！

