"use client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import BudgetForm from "../../components/budgets/BudgetForm";
import { BudgetFormData } from "../../types";
import { createBudget } from "../../api/BudgetApi";

export default function CreateBudgetView() {
  const navigate = useNavigate();

  const initialValues: BudgetFormData = {
    budgetName: "",
    budget: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createBudget,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: BudgetFormData) => {
    mutate(formData);
  };

  return (
    <main>
      <h1 className="text-center">Crear Budget</h1>

      <div className="flex justify-center items-center p-3 gap-5">
        <form
          noValidate
          className="flex flex-col mt-10"
          onSubmit={handleSubmit(handleForm)}
        >
          <BudgetForm register={register} errors={errors} />

          <input
            type="submit"
            value="Crear Budget"
            className="bg-purple-400 hover:bg-purple-200 p-4 rounded-md text-white cursor-pointer"
          />
        </form>
      </div>

      <nav className="flex justify-center items-center mt-5">
        <Link
          className="bg-purple-400 hover:bg-purple-200 p-4 rounded-md text-white cursor-pointer"
          to="/"
        >
          Volver a mis Budgets
        </Link>
        `
      </nav>
    </main>
  );
}
