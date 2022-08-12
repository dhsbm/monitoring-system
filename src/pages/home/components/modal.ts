import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useWebStore } from '@/store'

// 模态框响应式数据
export const modalData = reactive({
  isShow: false,
  title: '',
  url: '',
  isAdd: true,
  webId: -1,
  fun() {
    modalData.isAdd ? addWeb() : editWeb()
  },
})

// 开关模态框
export const switchShow = (isShow = true, title = '', url = '', isAdd = true, webId = -1) => {
  modalData.isShow = isShow
  modalData.title = title
  modalData.url = url
  modalData.isAdd = isAdd
  modalData.webId = webId
}
// 添加网站
const addWeb = () => {
  const webStore = useWebStore()
  webStore
    .addWeb({
      title: modalData.title,
      url: modalData.url,
    })
    .then(() => {
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
      switchShow(false)
    })
    .catch(() => {
      ElMessage({
        message: '创建失败',
        type: 'warning',
      })
    })
}

// 修改网站
const editWeb = () => {
  const webStore = useWebStore()
  webStore
    .editWeb({
      webId: modalData.webId,
      title: modalData.title,
      url: modalData.url,
      warn: '',
    })
    .then(() => {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
      switchShow(false)
    })
    .catch(() => {
      ElMessage({
        message: '修改失败',
        type: 'warning',
      })
    })
}
