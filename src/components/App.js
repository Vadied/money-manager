import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useBudget, UNCATEGORIXED_BUDGET_ID } from "../contexts/BudgetContext";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import BudgetCard from "./BudgetCard";
import TotalCard from "./TotalCard";

const App = () => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseBudgetIdModal, setExpenseBudgetIdModal] = useState(
    UNCATEGORIXED_BUDGET_ID
  );
  const { budgets } = useBudget();

  const handleClose = () => {
    setShowBudgetModal(false);
    setShowExpenseModal(false);
  };

  const openExpenseModal = (budgetId) => {
    setShowExpenseModal(true);
    setExpenseBudgetIdModal(budgetId);
  };

  const renderBudgets = () =>
    budgets.map((b, i) => (
      <BudgetCard key={i} gray {...b} onAddExpenseClick={openExpenseModal} />
    ));

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={openExpenseModal}>
          Add Expense
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {renderBudgets()}

        <BudgetCard
          gray
          id={UNCATEGORIXED_BUDGET_ID}
          name="Uncategorized"
          onAddExpenseClick={openExpenseModal}
        />
        <TotalCard />
      </div>

      <AddBudgetModal show={showBudgetModal} handleClose={handleClose} />
      <AddExpenseModal
        show={showExpenseModal}
        handleClose={handleClose}
        defaultBudgetId={expenseBudgetIdModal}
      />
    </Container>
  );
};

export default App;
