import datetime
from flask import Blueprint, jsonify, request
from database.data_manager import add_data
from database.data import loans

restful_apis = Blueprint("restful_apis", __name__)


@restful_apis.route("/")
def home():
    return "Welcome to the Loan Application API"

@restful_apis.route("/loans/<int:loan_id>/payments", methods=["POST"])
def create_payment(loan_id):
    try:
        if not any(loan["id"] == loan_id for loan in loans):
            return jsonify({"error": f"Loan with ID {loan_id} not found"}), 404

        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        required_fields = ['amount', 'date']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({"error": "Amount must be greater than 0"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Amount must be a valid number"}), 400

        try:
            payment_date = datetime.datetime.strptime(data['date'], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        payment = add_data('payment', loan_id=loan_id, amount=amount, payment_date=payment_date)
        return jsonify({"message": "Payment created successfully", "payment": payment}), 201

    except Exception as e:
        print("ERROR", e)
        return jsonify({"error": "Internal server error", "message": str(e)}), 500