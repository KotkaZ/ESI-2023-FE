import jwtDecode from 'jwt-decode'
import { useServices } from './useServices'
import { ref, type Ref } from 'vue'

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  SUPPORT = 'SUPPORT'
}

export interface User {
  authenticated: boolean
  roles: Role[]
  username: string
  userId: number
}

const user: Ref<User> = ref({
  authenticated: false,
  roles: [],
  username: '',
  userId: 0
})

export interface AuthFunctions {
  isAuthenticated: () => Promise<boolean>
  hasRoleOf: (role: Role) => boolean
  setToken: (token: string) => void
  userId: number
  logout: () => void
}

export function useAuth(): AuthFunctions {
  const { authApi } = useServices()

  const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('jwtToken')

    if (!token) {
      return false
    }

    const decodedToken = jwtDecode<User>(token)

    user.value.roles = decodedToken.roles
    user.value.userId = decodedToken.userId

    await authApi
      .authenticate({ authorization: token })
      .then((response) => {
        user.value.authenticated = response
      })
      .catch((err) => console.log(err.message))

    return user.value.authenticated
  }

  const hasRoleOf = (role: Role): boolean => {
    return user.value.roles.includes(role)
  }

  const logout = (): void => {
    localStorage.removeItem('jwtToken')
    user.value = { roles: [], username: '', authenticated: false, userId: 0 }
  }

  const setToken = (token: string): void => {
    if (token.startsWith('ey')) {
      const decodedToken = jwtDecode<User>(token)
      user.value.roles = decodedToken.roles
      user.value.userId = decodedToken.userId

      localStorage.setItem('jwtToken', token)
    }
  }

  return {
    isAuthenticated,
    hasRoleOf,
    logout,
    setToken,
    userId: user.value.userId
  }
}
