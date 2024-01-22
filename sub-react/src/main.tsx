import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

// 将render方法用函数包裹，供后续主应用与独立运行调用
function render(props: any) {
  const { container } = props
  const dom = container
    ? container.querySelector('#root')
    : document.getElementById('root')
  const root = createRoot(dom)
  root.render(<App />)
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
} else {
  renderWithQiankun({
    /**
     * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
     * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
     */
    bootstrap() {
      console.log('react app bootstrap')
    },
    /**
     * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
     */
    mount(props) {
      console.log('mount props', props)
      render(props)
    },
    /**
     * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
     */
    unmount(props: any) {
      console.log('unmount props', props)
    },
    /**
     * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
     */
    update(props: any) {
      console.log('update props', props)
    },
  })
}
