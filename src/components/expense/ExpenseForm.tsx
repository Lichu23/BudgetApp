import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ExpenseFormData} from "../../types";
import ErrorMessage from "../ErrorMessage";

type ExpenseFormProps = {
    errors: FieldErrors<ExpenseFormData>
    register: UseFormRegister<ExpenseFormData>
}

export default function ExpenseForm({errors, register} : ExpenseFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="expenseName"
                >Expense Name</label>
                <input
                    id="expenseName"
                    type="text"
                    className="w-full p-3  border-gray-300 border"
                    {...register("expenseName", {
                        required: "El nombre es obligatorio",
                    })}
                />
                {errors.expenseName && (
                    <ErrorMessage>{errors.expenseName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="expenseValue"
                >Expense Value</label>
                <input
                    type="number"
                    id="expenseValue"
                    className="w-full p-3  border-gray-300 border"
                    {...register("expenseValue", {
                        required: "El valor es obligatorio"
                    })}
                />
                {errors.expenseValue && (
                    <ErrorMessage>{errors.expenseValue.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}