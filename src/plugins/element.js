import Vue from 'vue'
// 用到什么组件需先进行注册，否则会报错 带-的关键字注册时必须将首字母大写并去掉-，如menu-item-group；
// 单个单词的关键字可以直接小写，但有时会报错，这时首字母大写即可
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  container,
  header,
  aside,
  main, Menu,
  submenu,
  MenuItemGroup,
  MenuItem,
  breadcrumb,
  BreadcrumbItem,
  card,
  row,
  col,
  table,
  TableColumn,
  Switch,
  tooltip,
  pagination,
  dialog,
  tag,
  alert,
  cascader,
  tree

} from 'element-ui'

// 全局注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)
Vue.use(Menu)
Vue.use(submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(card)
Vue.use(col)
Vue.use(row)
Vue.use(table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(tooltip)
Vue.use(pagination)
Vue.use(dialog)
Vue.use(tag)
Vue.use(alert)
Vue.use(cascader)
Vue.use(tree)
// Message弹框组件与上面的组件不同需要挂载到Vue上
Vue.prototype.$message = Message
