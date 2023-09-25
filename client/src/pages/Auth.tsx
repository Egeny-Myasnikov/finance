import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({ email, password })
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('Вы вошли в систему')
                navigate('/')

            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const registratioinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({ email, password })
            if (data) {
                toast.success('Поздравляю! Аккаунт создан.')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }
    return (
        <div className='mt-40 flex-col flex justify-center items-center bg-slate-900 text-white'>
            <h1 className='mb-10 text-center text-xl'>
                {
                    isLogin ? 'Вход' : 'Регистрация'
                }
            </h1>

            <form
                onSubmit={isLogin ? loginHandler : registratioinHandler}
                className='flex flex-col w-1/3 mx-auto gap-5'
            >
                <input
                    type="text"
                    className="input"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="input"
                    placeholder='Пароль'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-green mx-auto">
                    {
                        isLogin ? 'Войти' : 'Зарегистрироваться'
                    }
                </button>
            </form>

            <div className="flex justify-center mt-5">
                {
                    isLogin ? (
                        <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">У Вас нет аккаунта?</button>
                    ) : (
                        <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">Уже есть аккаунт?</button>
                    )
                }
            </div>


        </div>
    )
}

export default Auth