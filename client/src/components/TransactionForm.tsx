import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const { categories } = useLoaderData() as IResponseTransactionLoader

    return <div className="rounded-md p-4 bg-slate-800">
        <Form className='grid gap-6' method='post' action='/transactions'>
            <label className='grid gap-2' htmlFor="title">
                <span>Название:</span>
                <input className='input border-slate-900' type="text" placeholder='Название...' name='title' required />
            </label>
            <label className='grid gap-2' htmlFor="amount">
                <span>Сумма:</span>
                <input className='input border-slate-900' type="number" placeholder='Сумма...' name='amount' required />
            </label>

            {/* Select */}
            {
                categories.length ? <label htmlFor="category" className='grid gap-2'>
                    <span>Категории:</span>
                    <select className='text-slate-900 input border-slate-900 bg-slate-300' name="category" required >
                        {
                            categories.map((ctg, idx) => (
                                <option key={idx} value={ctg.id}>{ctg.title}</option>
                            )
                            )
                        }
                    </select>
                </label> : <h1 className='mt-1 text-red-300'>Создайте свою первую категорию</h1>
            }

            <button
                onClick={(e) => {
                    e.preventDefault()
                    setVisibleModal(true)
                }}
                className="mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
            >
                <FaPlus />
                <span>Менеджер категорий</span>

            </button>

            {/*  Radio Buttons */}
            <div className="flex gap-4 items-center">
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="radio" name="type" value={'income'} className='form-radio text-blue-600' />
                    <span>Доход</span>
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="radio" name="type" value={'expense'} className='form-radio text-blue-600' />
                    <span>Расход</span>
                </label>
            </div>

            {/* Submit button */}
            <button className='btn btn-green mt-3 max-w-fit'>Submit</button>

        </Form>

        {
            visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal} />
        }
    </div>
}

export default TransactionForm