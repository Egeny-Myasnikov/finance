import { useAppSelector } from "../store/hooks"

export const useAuth = (): boolean => {
    const isAuth = useAppSelector((store) => store.user.isAuth)
    return isAuth
}