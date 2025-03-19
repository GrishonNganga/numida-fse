import { useState } from "react";
import logo from "@/assets/logo.numida.png";
import { Button } from "@/components/ui/button";
import LoanCalculatorModal from "./loan-calculator-modal";
import "./app-container.css";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <div className="app-container" data-testid="app-container">
      <div className="container">
        <div className="app-header">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="app-header-right">
            <Button onClick={() => setCalculatorOpen(true)}>
              Loan calculator
            </Button>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="main-content">
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
      <LoanCalculatorModal
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </div>
  );
};

export default AppContainer;
