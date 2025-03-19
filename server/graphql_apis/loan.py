import graphene
from database.data import loans, loan_payments

class LoanPayment(graphene.ObjectType):
    id = graphene.ID(required=True)
    loan_id = graphene.ID(required=True, description="The ID of the loan referenced")
    payment_date = graphene.Date(required=True, description="The date of the payment")
    amount = graphene.Int(description="The amount of the payment")

class ExistingLoan(graphene.ObjectType):
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    interest_rate = graphene.Float(required=True, description="The interest rate of the loan")
    principal = graphene.Int(required=True, description="The loan amount given as principal")
    due_date = graphene.Date(required=True, description="Due date of the loan")
    payments = graphene.List(LoanPayment)
    
    def resolve_payments(self, info):
        return [payment for payment in loan_payments if payment["loan_id"] == self["id"]]
    

class LoanFilter(graphene.InputObjectType):
    name = graphene.String()
    amount = graphene.Int()

class LoanQueries(graphene.ObjectType):
    loans = graphene.List(
        ExistingLoan,
        filters=graphene.Argument(LoanFilter, default_value={})
    )
    loan_payments = graphene.List(LoanPayment)

    def resolve_loans(self, info, filters=None):
        filtered_loans = loans

        if filters:
            if filters.get('name'):
                filtered_loans = [loan for loan in filtered_loans if filters['name'].lower() in loan['name'].lower()]
            if filters.get('amount'):
                filtered_loans = [loan for loan in filtered_loans if loan['principal'] == filters['amount']]

        return filtered_loans
    
    def resolve_loan_payments(self, info):
        return loan_payments