import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import { ICategory, IResponseTransactionLoader, ITransaction } from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { formatToRU } from '../helpers/currency.helper'
import Chart from '../components/Chart'

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories')
    const transactions = await instance.get<ITransaction[]>('/transactions')
    const totalIncome = await instance.get<number>('/transactions/income/find')
    const totalExpense = await instance.get<number>('/transactions/expense/find')

    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data
    }
    return data
}
export const transactionAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData()
            const newTransaction = {
                title: formData.get('title'),
                amount: +formData.get('amount'),
                category: formData.get('category'),
                type: formData.get('type')
            }
            await instance.post('/transactions', newTransaction)
            toast.success('Транзакция добавлена.')
            return null
        }
        case 'DELETE': {
            const formData = await request.formData()
            const transactionId = formData.get('id')
            await instance.delete(`transactions/transaction/${transactionId}`)
            toast.success('Транзакция удалена.')
            return null
        }
    }
}

const Transactions: FC = () => {
    const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader
    return <>
        < div className="grid grid-cols-3 gap-4 mt-4 items-start" >
            {/* Add Transaction Form */}
            <div className="col-span-2 grid" > <TransactionForm /></div>
            {/* Statistic blocks */}
            < div className="rounded-md bg-slate-800 p-3" >
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className='uppercase text-md font-bold text-center '>Всего доход:</p>
                        <p className='rounded-sm mt-2 bg-green-600 p-1 text-center '>
                            {formatToRU.format(totalIncome)}
                        </p>
                    </div>
                    <div>
                        <p className='uppercase text-md font-bold text-center '>Всего расход:</p>
                        <p className='rounded-sm mt-2 bg-red-500 p-1 text-center '>
                            {formatToRU.format(totalExpense)}
                        </p>
                    </div>
                </div>
                <>
                    <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
                </>
            </div >

        </div >
        {/* Transactions Table */}

        < TransactionTable limit={5} />
    </>
}

export default Transactions