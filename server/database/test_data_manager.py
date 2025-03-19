# test_data_manager.py
import pytest
from database.data_manager import add_data

@pytest.fixture
def mock_data(monkeypatch):
    mock_loans = []
    mock_payments = []

    monkeypatch.setattr('data.loans', mock_loans)
    monkeypatch.setattr('data.loan_payments', mock_payments)

    return mock_loans, mock_payments

def test_add_data_loan(mock_data):
    mock_loans, mock_payments = mock_data
    new_loan = add_data('loan', amount=1000, borrower='Alice')
    assert new_loan == {'id': 1, 'amount': 1000, 'borrower': 'Alice'}
    assert mock_loans == [{'id': 1, 'amount': 1000, 'borrower': 'Alice'}]

def test_add_data_payment(mock_data):
    mock_loans, mock_payments = mock_data
    new_loan = add_data('loan', amount=1000, borrower='Alice')
    new_payment = add_data('payment', loan_id=new_loan['id'], amount=200, payment_date='2025-03-19')
    assert new_payment == {'id': 1, 'loan_id': 1, 'amount': 200, 'payment_date': '2025-03-19'}
    assert mock_payments == [{'id': 1, 'loan_id': 1, 'amount': 200, 'payment_date': '2025-03-19'}]
