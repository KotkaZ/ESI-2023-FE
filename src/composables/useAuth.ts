import jwtDecode from 'jwt-decode';
import { useServices } from './useServices';
import { ref, type Ref } from 'vue';

export interface User {
    authenticated: boolean
    roles: string,
    username: string
}

export interface AuthFunctions {
    isAuthenticated: () => boolean;
    hasRoleOf: (roles: string) => boolean;
    logout: () => void;
}

export function useAuth(): AuthFunctions {
    const { authApi } = useServices();

    const user: Ref<User> = ref({
        authenticated: false,
        roles: "",
        username: ""
    })

    const isAuthenticated = (): boolean => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            return false
        }

        user.value.roles = jwtDecode<User>(token).roles;

        authApi.authenticate({authorization: token})
            .then((response) => {
                user.value.authenticated = response
            }).catch(err => console.log(err.message));

        return user.value.authenticated;
    }

    const hasRoleOf = (roles: string): boolean => {
        return user.value.roles === roles;
    }

    const logout = (): void => {
        localStorage.removeItem('jwtToken');
        user.value = { roles: "", username: "", authenticated: false };
    }

    return {
        isAuthenticated,
        hasRoleOf,
        logout
    }
}