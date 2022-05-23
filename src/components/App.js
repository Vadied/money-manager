import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useBudget } from "../contexts/BudgetContext";
import AddBudgetModal from "./AddBudgetModal";
import BudgetCard from "./BudgetCard";

const App = () => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const { budgets } = useBudget();

  const getBudgets = () => budgets.map((b) => <BudgetCard gray {...b} />);

  return (
    <Container>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      ></div>

      <AddBudgetModal show={showBudgetModal} />
    </Container>
  );
};

export default App;
