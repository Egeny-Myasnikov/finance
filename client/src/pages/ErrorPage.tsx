import { FC } from 'react'
import imgError from '../assets/react.svg'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
    return (
        <div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
            <h1 className='text-7xl'>Такой страницы не существует</h1>
            <h1 className='text-3xl'>Ошибка - 404</h1>
            <img src={imgError} alt=" Ошибка - 404" />
            <Link
                to={'/'}
                className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'
            >
                Назад
            </Link>
        </div>
    )
}

export default ErrorPage