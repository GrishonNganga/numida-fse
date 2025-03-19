import AppContainer from "./app-container";
import Header from "./header";
import Loans from "../loan";
import ErrorBoundary from "../error-boundary";

const App = () => {
  return (
    <AppContainer>
      <ErrorBoundary>
        <Header />
        <Loans/>
      </ErrorBoundary>
    </AppContainer>
  );
};

export default App;
