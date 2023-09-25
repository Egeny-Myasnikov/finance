import { FC } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from "../hooks/useAuth"
import { useAppDispatch } from "../store/hooks"
import { logout } from "../store/user/userSlice"
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper"
import { toast } from 'react-toastify'
const Header: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли из системы')
        navigate('/')
    }


    return <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm ">
        <Link to='/'>
            <FaBtc size={20} />
        </Link>

        {/* menu */}
        {
            isAuth && (
                <nav className=" ml-auto mr-10">
                    <ul className="flex items-center gap-5">
                        <li>
                            <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> На главную</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/transactions'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Транзакции</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Категории</NavLink>
                        </li>
                    </ul>

                </nav>
            )
        }
        {/* actions */}
        {
            isAuth ? (
                <button onClick={logoutHandler} className="btn btn-red">
                    <span>Выйти</span>
                    <FaSignOutAlt />
                </button>
            ) : (
                <Link
                    className="py-2 text-white/50 hover:text-white ml-auto"
                    to={'auth'}>
                    Войти / Зарегистрироваться
                </Link>
            )
        }


    </header>
}

export default Header