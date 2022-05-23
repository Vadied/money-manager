import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudget() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Budget
  function addBudget(newBudget) {
    setBudgets((previous) => {
      if (previous.find((p) => p.name === newBudget.name)) return previous;
      return [...previous, { ...newBudget, id: uuidV4() }];
    });
  }

  function deleteBudget({ id }) {
    setBudgets((previous) => previous.filter((p) => p.id !== id));
  }

  // Expenses
  function addBudgetExpense(newExpense) {
    setExpenses((previous) => [...previous, { ...newExpense, id: uuidV4() }]);
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter((e) => e.budgetId === budgetId);
  }

  function deleteBudgetExpenses({ id }) {
    setBudgets((previous) => previous.filter((p) => p.id !== id));
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        deleteBudget,
        addBudgetExpense,
        getBudgetExpenses,
        deleteBudgetExpenses,
      }}
    >
      {children}{" "}
    </BudgetContext.Provider>
  );
};
