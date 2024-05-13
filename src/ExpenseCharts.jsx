
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { sumByCategory } from './ArrayUtilities';


const COLORS = ['#FF9304', '#A000FF', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
  const radius = outerRadius * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} fontSize='12px' dominantBaseline="central" tickLine={false}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ExpensesPieChart({expenseData}){

    // const aggrDict = expenseData.reduce((result, exp)=>{
    //     if(!result.hasOwnProperty(exp.category)){
    //         result[exp.category] = exp.price;
    //     } else {
    //         result[exp.category] += exp.price;
    //     }
    //     return result;
    // }, {})

    // const chartData = Object.keys(aggrDict).map((expCat)=>({category:expCat, value:aggrDict[expCat]}));

    const chartData = sumByCategory(expenseData, 'category', 'price');

    // console.log('aggregated chart data:', chartData)

    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie 
                    data={chartData} 
                    dataKey='value' 
                    nameKey='category' 
                    cx="50%" 
                    cy="40%" 
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {expenseData.map((exp, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none'/>
                    ))}
                </Pie>
                <Legend 
                    iconType='rect' 
                    formatter={(value, entry, index) => <span style={{color:'white'}}>{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

function ExpenseBarChart({expenseData}){

    const chartData = sumByCategory(expenseData, 'category', 'price');
    chartData.sort((first, second)=>(second.price - first.price))

    console.log('Descending sort data', chartData);

    return (
        <ResponsiveContainer width={'95%'} height='95%'>
            <BarChart 
                data={chartData}
                layout='vertical' 
                nameKey='category' 
                dataKey='value' 
                label={true} 
                barCategoryGap={20}
                // width={340}
                // height={360}   
                // margin={{
                //     top: 30,
                //     right: 20,
                //     bottom: 10,
                //     left: 10,
                // }}         
            >
                <XAxis 
                    dataKey='value' 
                    type='number'
                    hide
                />
                <YAxis 
                    dataKey='category' 
                    type='category'
                    width={100}
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                />
                <Bar 
                    dataKey="value" 
                    fill="#8784D2" 
                    radius={[0, 20, 20, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export { ExpensesPieChart, ExpenseBarChart }