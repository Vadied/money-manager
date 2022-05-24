import { Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useBudget } from "../contexts/BudgetContext";

const TotalCard = ({ gray }) => {
  const { budgets, expenses } = useBudget();

  const max = budgets.reduce((sum, e) => sum + e.max, 0);
  if (!max) return;

  const amount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const cardClasses = () => {
    if (amount > max) return "bg-danger bg-opacity-10";
    if (gray) return "bg-light";
  };

  const getProgressBarVariant = ({ amount, max }) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };

  return (
    <Card className={cardClasses()}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">Total</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}

            <span className="text-muted fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>

        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant({ amount, max })}
          min={0}
          max={max}
          now={amount}
        />
      </Card.Body>
    </Card>
  );
};

export default TotalCard;
