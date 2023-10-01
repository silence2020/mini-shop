import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
//创建pinia实例
const pinia = createPinia()
//使用持久化插件
pinia.use(persist)
//默认导出
export default pinia