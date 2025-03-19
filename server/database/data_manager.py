import database.data as data
import copy

def add_data(data_type, **kwargs):
    """
    Add data to either loans or loan_payments
    
    Args:
        data_type: Either 'loan' or 'payment'
        **kwargs: Data fields to add
    
    Returns:
        The newly added item
    """
    if data_type == 'loan':
        loans = data.loans
        new_id = max(loan["id"] for loan in loans) + 1 if loans else 1
        new_loan = {"id": new_id}
        new_loan.update(kwargs)
        loans.append(new_loan)
        data.loans = loans
        
        return new_loan
        
    elif data_type == 'payment':
        payments = data.loan_payments
        new_id = max(payment["id"] for payment in payments) + 1 if payments else 1        
        new_payment = {"id": new_id}
        new_payment.update(kwargs)
        payments.append(new_payment)
        data.loan_payments = payments
        
        return new_payment
    return None

def delete_data(data_type, item_id):
    """
    Delete data from either loans or loan_payments
    
    Args:
        data_type: Either 'loan' or 'payment'
        item_id: ID of the item to delete
    
    Returns:
        True if deletion was successful, False otherwise
    """
    if data_type == 'loan':
        loans = copy.deepcopy(data.loans)
        exists = any(loan["id"] == item_id for loan in loans)
        if not exists:
            return False
        data.loans = [loan for loan in loans if loan["id"] != item_id]
        if exists:
            data.loan_payments = [payment for payment in data.loan_payments if payment["loan_id"] != item_id]
        
        return True
        
    elif data_type == 'payment':
        payments = copy.deepcopy(data.loan_payments)
        exists = any(payment["id"] == item_id for payment in payments)
        if not exists:
            return False
        data.loan_payments = [payment for payment in payments if payment["id"] != item_id]
        
        return True
    
    return False
