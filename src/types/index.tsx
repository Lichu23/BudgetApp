import { z } from "zod";

//Expenses
export const expenseSchema = z.object({
  _id: z.string(),
  expenseName: z.string(),
  expenseValue: z.number()
});

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseFormData = Pick<Expense, "expenseName" | "expenseValue">;

//Auth & users

const authSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "username" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationTokenForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type ConfirmToken = Pick<Auth, "token">;

//Users
export const userScema = authSchema.pick(
  {
    username: true,
    email: true,
  }
).extend({
  _id: z.string() //agregamos otro atributo q queremos
})
export type User = z.infer<typeof userScema>

export const budgetSchema = z.object({
  _id: z.string(),
  budgetName: z.string(),
  budget: z.number(),
});

export const dashboardBudgetSchema = z.array(
  budgetSchema.pick({
    _id: true,
    budgetName: true,
    budget: true,
  })
);

export type Budget = z.infer<typeof budgetSchema>;

//con el Pick seleccionas las propiedades del type nombrado antes de la , //
export type BudgetFormData = Pick<Budget, "budgetName" | "budget">;
