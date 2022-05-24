import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATEGORIXED_BUDGET_ID = "Uncategorized";

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Budget
  const addBudget = (newBudget) =>
    setBudgets((previous) => {
      if (previous.find((p) => p.name === newBudget.name)) return previous;
      return [...previous, { ...newBudget, id: uuidV4() }];
    });
  const deleteBudget = ({ id }) =>
    setBudgets((previous) => previous.filter((p) => p.id !== id));

  // Expenses
  const addExpense = (newExpense) =>
    setExpenses((previous) => [...previous, { ...newExpense, id: uuidV4() }]);
  const getExpenses = ({ id }) => expenses.filter((e) => e.budgetId === id);
  const deleteExpenses = ({ id }) =>
    setExpenses((previous) => previous.filter((p) => p.id !== id));

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        deleteBudget,
        addExpense,
        getExpenses,
        deleteExpenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
