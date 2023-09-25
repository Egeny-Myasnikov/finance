import { FC } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

const COLORS = ['#16A34A', '#EF4444']
interface IChart {
    totalIncome: number
    totalExpense: number
}
interface IData {
    value: number
    name: string
}


const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
    const data = new Array<IData>(
        { value: totalIncome, name: 'Доход' },
        { value: totalExpense, name: 'Расход' },
    )
    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                fill="#00f"
                stroke='transparent'
                dataKey="value"
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />

        </PieChart>
    )
}

export default Chart