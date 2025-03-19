import "./loan-card-skeleton.css";

const LoanCardSkeleton = () => {
  return (
    <div className="loan-card-skeleton">
      <div className="loan-header-skeleton">
        <div className="loan-icon-skeleton" />
        <div className="loan-info-skeleton">
          <div className="loan-name-skeleton" />
          <div className="loan-amount-skeleton" />
        </div>
        <div className="loan-actions-skeleton">
          <div className="loan-status-skeleton" />
          <div className="loan-details-icon-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default LoanCardSkeleton; 