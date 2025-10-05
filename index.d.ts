/**
 * FaeriesSect 插件 SDK 类型定义
 */

declare module 'faeriessect' {
  /** 插件上下文 */
  export interface PluginContext {
    subscriptions: Array<() => void>
  }

  /** 命令API */
  export namespace commands {
    function registerCommand(
      commandId: string,
      callback: (...args: any[]) => any
    ): { dispose: () => void }
  }

  /** UI扩展API */
  export namespace ui {
    interface TopBarItemConfig {
      id: string
      type: 'button' | 'icon'
      label?: string
      icon?: string
      tooltip?: string
      order?: number
      style?: Record<string, any>
      isActive?: boolean
      isDisabled?: boolean
      activeStyle?: Record<string, any>
      hoverStyle?: Record<string, any>
      buttonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'text'
      plain?: boolean
      round?: boolean
      circle?: boolean
      onClick: () => void
    }

    function registerTopBarItem(config: TopBarItemConfig): { dispose: () => void }
  }

  /** 窗口API */
  export namespace window {
    interface NotificationOptions {
      title: string
      body: string
      position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
      duration?: number
    }

    interface VideoPlayerOptions {
      videoUrl: string
      title?: string
      autoplay?: boolean
      source?: string
    }

    interface BrowserWindowOptions {
      url: string
      title?: string
      enableTabs?: boolean
    }

    interface WebviewPanelOptions {
      htmlPath: string
    }

    function showNotification(options: NotificationOptions): void
    function showInformationMessage(message: string): void
    function showWarningMessage(message: string): void
    function showErrorMessage(message: string): void
    function openVideoPlayer(options: VideoPlayerOptions): void
    function openBrowser(options: BrowserWindowOptions): void
    function createWebviewPanel(
      viewType: string,
      title: string,
      options: WebviewPanelOptions
    ): { webview: { onDidReceiveMessage: (callback: (msg: any) => void) => void } }
  }

  /** 工作区API */
  export namespace workspace {
    interface Configuration {
      get(key: string, defaultValue?: any): any
      update(key: string, value: any): void
    }

    function getConfiguration(section?: string): Configuration
  }

  /** 应用API */
  export namespace app {
    function getName(): string
    function getVersion(): string
    function getPath(
      name: 'home' | 'appData' | 'userData' | 'temp' | 'downloads'
    ): string
  }

  /** 状态API */
  export namespace state {
    interface UserInfo {
      id: string
      username: string
      isLogin: boolean
    }

    function getUserInfo(): Promise<UserInfo>
    function getSettings(key?: string): Promise<any>
    function onDidChangeState(
      callback: (key: string, value: any) => void
    ): { dispose: () => void }
  }

  /** 系统API */
  export namespace system {
    interface SystemInfo {
      platform: string
      arch: string
      version: string
      hostname: string
      cpus: number
      totalMemory: number
      freeMemory: number
    }

    function getSystemInfo(): Promise<SystemInfo>

    namespace registry {
      function getValue(key: string, name: string): Promise<string | null>
      function setValue(
        key: string,
        name: string,
        type: string,
        value: string
      ): Promise<void>
    }
  }

  /** 子进程API */
  export namespace subprocess {
    interface ChildProcess {
      pid: number
      onStdout(callback: (data: string) => void): void
      onStderr(callback: (data: string) => void): void
      onExit(callback: (code: number) => void): void
      kill(): void
      write(data: string): void
    }

    function spawn(
      command: string,
      args: string[],
      options?: any
    ): ChildProcess

    function exec(command: string): Promise<{ stdout: string; stderr: string }>
  }

  /** 文件系统API */
  export namespace fs {
    function readFile(filePath: string, encoding?: string): Promise<string>
    function writeFile(filePath: string, data: string | Buffer): Promise<void>
    function exists(filePath: string): Promise<boolean>
    function mkdir(dirPath: string): Promise<void>
  }

  /** Events API */
  export namespace events {
    function on(eventName: string, handler: (...args: any[]) => void): { dispose: () => void }
    function emit(eventName: string, ...args: any[]): void
    function once(eventName: string, handler: (...args: any[]) => void): { dispose: () => void }
  }

  /** StatusBar API */
  export namespace statusBar {
    interface StatusBarItem {
      id: string
      alignment: 'left' | 'right'
      priority: number
      text: string
      tooltip?: string
      icon?: string
      command?: string
      color?: string
      backgroundColor?: string
      show(): void
      hide(): void
      dispose(): void
    }
    
    function createStatusBarItem(alignment?: 'left' | 'right', priority?: number): StatusBarItem
  }

  /** 默认导出 */
  const faeriessect: {
    commands: typeof commands
    ui: typeof ui
    window: typeof window
    workspace: typeof workspace
    app: typeof app
    state: typeof state
    system: typeof system
    subprocess: typeof subprocess
    fs: typeof fs
    events: typeof events
    statusBar: typeof statusBar
  }

  export default faeriessect
}

/** 插件入口点 */
declare global {
  module NodeJS {
    interface Global {
      acquireVsCodeApi?: () => VSCodeAPI
    }
  }

  interface Window {
    acquireVsCodeApi(): VSCodeAPI
  }

  interface VSCodeAPI {
    postMessage(message: any): void
    setState(state: any): void
    getState(): any
  }
}

export { }

