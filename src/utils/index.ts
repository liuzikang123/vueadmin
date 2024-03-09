
export const requiredRule = (message: string) => ({ required: true, message: `${message}不能为空`, trigger: 'blur' })
export const maxStr6 = (message = '') => ({ pattern: /^[a-zA-Z0-9]{4,12}$/, message: `${message}长度只能是4-12位`, trigger: 'blur' })

export const requiredPhone = () => ({ pattern: /^1\d{10}$/, message: '请输入11数字的手机号', trigger: 'blur' })

export const requiredStr = (message = '', min = 4, max = 12) => ({
  pattern: new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`),
  message: `${message}只能是4-12位的英文或数字`, 
  trigger: 'blur'
})