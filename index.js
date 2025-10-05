/**
 * FaeriesSect Plugin SDK Runtime
 * 
 * 这是一个桩文件（stub），真实的SDK由FaeriesSect主进程在运行时注入。
 * 此文件提供类型定义和开发时的模拟实现。
 */

// 尝试从全局获取真实SDK（运行时由主进程注入）
if (typeof global !== 'undefined' && global.faeriessect) {
  module.exports = global.faeriessect
} else if (typeof window !== 'undefined' && window.faeriessect) {
  module.exports = window.faeriessect
} else {
  // 开发环境模拟实现（仅供类型检查，不可运行）
  console.warn('[faeriessect] SDK未注入，使用模拟实现')
  
  module.exports = {
    commands: {
      registerCommand: (id, callback) => {
        console.log('[Mock] registerCommand:', id)
        return { dispose: () => {} }
      }
    },
    
    window: {
      showInformationMessage: (message) => console.log('[Mock]', message),
      showWarningMessage: (message) => console.warn('[Mock]', message),
      showErrorMessage: (message) => console.error('[Mock]', message),
      showNotification: (options) => console.log('[Mock] Notification:', options),
      createWebviewPanel: () => ({ webview: { onDidReceiveMessage: () => {} } })
    },
    
    workspace: {
      getConfiguration: () => ({
        get: (key, defaultValue) => defaultValue,
        update: () => {}
      })
    },
    
    app: {
      getName: () => 'FaeriesSect',
      getVersion: () => '1.0.0',
      getPath: (name) => '/path/to/' + name
    },
    
    state: {
      getUserInfo: async () => ({ id: '', username: '', isLogin: false }),
      getSettings: async () => ({}),
      onDidChangeState: () => ({ dispose: () => {} })
    },
    
    ui: {
      registerTopBarItem: (config) => {
        console.log('[Mock] registerTopBarItem:', config.id)
        return { dispose: () => {} }
      }
    },
    
    system: {
      getSystemInfo: async () => ({
        platform: process.platform,
        arch: process.arch,
        version: '',
        hostname: '',
        cpus: 0,
        totalMemory: 0,
        freeMemory: 0
      }),
      registry: {
        getValue: async () => null,
        setValue: async () => {}
      }
    },
    
    subprocess: {
      spawn: () => ({
        pid: 0,
        onStdout: () => {},
        onStderr: () => {},
        onExit: () => {},
        kill: () => {},
        write: () => {}
      }),
      exec: async () => ({ stdout: '', stderr: '' })
    },
    
    fs: {
      readFile: async () => '',
      writeFile: async () => {},
      exists: async () => false,
      mkdir: async () => {}
    },
    
    events: {
      on: (eventName, handler) => {
        console.log('[Mock] events.on:', eventName)
        return { dispose: () => {} }
      },
      emit: (eventName, ...args) => {
        console.log('[Mock] events.emit:', eventName, args)
      },
      once: (eventName, handler) => {
        console.log('[Mock] events.once:', eventName)
        return { dispose: () => {} }
      }
    },
    
    statusBar: {
      createStatusBarItem: (alignment, priority) => {
        console.log('[Mock] createStatusBarItem:', alignment, priority)
        return {
          id: 'mock',
          alignment: alignment || 'left',
          priority: priority || 0,
          text: '',
          tooltip: '',
          icon: '',
          command: '',
          color: '',
          backgroundColor: '',
          show: () => console.log('[Mock] statusBar.show()'),
          hide: () => console.log('[Mock] statusBar.hide()'),
          dispose: () => console.log('[Mock] statusBar.dispose()')
        }
      }
    }
  }
}

