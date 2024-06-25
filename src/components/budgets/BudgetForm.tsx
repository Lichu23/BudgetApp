import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { BudgetFormData } from "../../types";

type BudgetFormProps = {
  register: UseFormRegister<BudgetFormData>;
  errors: FieldErrors<BudgetFormData>;
};

export default function BudgetForm({ errors, register }: BudgetFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="budgetName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>
        <input
          id="budgetName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Budget"
          {...register("budgetName", {
            required: "El budget name es obligatorio",
          })}
        />

        {errors.budgetName && (
          <ErrorMessage>{errors.budgetName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="budget" className="text-sm uppercase font-bold">
          Budget
        </label>
        <input
          id="budget"
          className="w-full p-3  border border-gray-200"
          type="number"
          placeholder="Nombre del Cliente"
          {...register("budget", {
            required: "Este campo es obligatorio",
          })}
        />

        {errors.budget && <ErrorMessage>{errors.budget.message}</ErrorMessage>}
      </div>
    </>
  );
}
