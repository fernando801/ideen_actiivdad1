import { reactive } from 'vue'
import { getAuth } from 'firebase/auth'
export const session = reactive({ user: getAuth().currentUser })
