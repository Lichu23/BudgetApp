import { Expense } from "../../types"
import ExpenseCard from "./ExpenseCard"

type ExpenseListProps = {
    expenses: Expense[]
}

export default function ExpenseList({expenses}: ExpenseListProps) {
    
    return (
        <>
        <div className='flex gap-5  2xl:overflow-auto pb-32'>
        {expenses?.length === 0 ? ( // Check for empty expenses array
        <div className="text-gray-500 text-center pt-3">No Hay Tareas</div>
      ) : (
        expenses.map((expense, index) => (
          <div key={index}>
            <ExpenseCard expenses={expense}  key={expense._id}/>
          </div>
        ))
      )}
      </div>
 </>
       
        
  )
}
