<p align="center">
  <img src="./web/src/assets/logo.numida.png" alt="Logo" width="200">
</p>

# Numida Full Stack Assessment Implementation

### TLDR: Watch the [demo here](https://drive.google.com/file/d/1ciIAoplWAX2VnSb50BoON4SnNm3T-pf3/view?usp=sharing) or try the app [here](https://numida-fse.vercel.app)

This implementation focuses on creating a loan management system that displays and manages loan statuses effectively. The core functionality revolves around loan payment tracking and status visualization, with an emphasis on clean architecture and user experience.

## Deployment

### Frontend Deployment (Vercel)
The frontend of this application is deployed on Vercel. You can access it at:
- **URL**: [https://numida-fse.vercel.app](https://numida-fse.vercel.app)
- **Hosting Platform**: Vercel
- **Deployment Method**: Automatic deployment from the `main` branch of the repository.
- **How to Deploy Updates**:
  1. Push changes to the `main` branch.
  2. Vercel will automatically build and deploy the latest version.

### Backend Deployment (Render)
The backend is deployed on Render and is accessible via the following endpoint:
- **GraphQL API URL**: [https://numida-fse.onrender.com/graphql](https://numida-fse.onrender.com/graphql)
- **REST API URL**: [https://numida-fse.onrender.com](https://numida-fse.onrender.com)
- **Hosting Platform**: Render
- **Deployment Method**: Automatic deployment from the `main` branch.
- **How to Deploy Updates**:
  1. Push changes to the `main` branch.
  2. Render will automatically detect the updates, build, and deploy the latest version.

<span style="color:red">NOTE</span>: Render automatically shuts down application service after 10 mins of inactivity, so initial load might take a while before it restarts.

## Core Requirements Completed

### GraphQL Data Layer

##### GraphQL endpoint at `https://numida-fse.onrender.com/graphql`

- Get a list of all loan payments
  Query

  ```graphql
  {
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
  ```

  Sample response

  ```graphql
  {
  "data": {
    "loanPayments": [
      {
        "id": "1",
        "loanId": "1",
        "paymentDate": "2024-03-04"
      },
      ...
      {
        "id": "3",
        "loanId": "3",
        "paymentDate": "2024-04-05"
      }
    ]
  }
  }
  ```

- Get a list of all loans with payments embedded
  Query
  ```graphql
  {
    loans {
      id
      principal
      payments {
        id
        loanId
        paymentDate
        amount
      }
    }
  }
  ```
  Sample response
  ```graphql
  {
  "data": {
    "loans": [
      {
        "id": "1",
        "principal": 10000,
        "payments": [
          {
            "id": "1",
            "loanId": "1",
            "paymentDate": "2024-03-04",
            "amount": 1000
          },
          ...
          {
            "id": "5",
            "loanId": "1",
            "paymentDate": "2024-03-04",
            "amount": 900
          }
        ]
      },
      ...
      {
        "id": "3",
        "principal": 30000,
        "payments": [
          {
            "id": "3",
            "loanId": "3",
            "paymentDate": "2024-04-05",
            "amount": null
          }
        ]
      },
    ]
  }
  }
  ```

### Restful API Data Layer

- RESTful API for creating a new payment for a specific loan
  ```bash
  POST: https://numida-fse.onrender.com/loans/<loan_id>/payments 
  {
    amount: 100,
    date: "2025-03-13"
  }
  ```

### Frontend Implementation

- Loan and payment data display with status-based styling
- Payment categorization function implemented with status indicators:
  - **On Time** (Green)
  - **Late** (Orange)
  - **Defaulted** (Red)
  - **Unpaid** (Grey)

##### Screenshots
<p align="center">
  <img src="./screenshots/web-1.PNG" alt="Image 1" width="30%">
  <img src="./screenshots/web-2.PNG" alt="Image 1" width="30%">
  <img src="./screenshots/web-3.PNG" alt="Image 1" width="30%">
</p>
<p align="center">
  <img src="./screenshots/mobile-1.PNG" alt="Image 4" width="30%">
  <img src="./screenshots/mobile-2.PNG" alt="Image 4" width="30%">
  <img src="./screenshots/mobile-3.PNG" alt="Image 4" width="30%">
</p>


### Code Refactoring

- Improved `LoanCalculator` component with:
  - Form validation
  - Real-time calculations
  - Error handling

##### Screenshots
<table>
  <tr>
    <td style="padding-right: 20px;"><img src="./screenshots/loan-calc-web.PNG" alt="Image 1" width="100%"></td>
    <td><img src="./screenshots/loan-calc-mobile.PNG" alt="Image 2" width="100%"></td>
  </tr>
</table>

## Additional Implementations
- Added loans search filters
- Implemented error handling for API calls
- Added loading states for better UX
- Added tests for critical components
  ```bash
  npm run test:coverage
  ```

## Areas for Improvement

Given more time, these areas could be enhanced:

#### Authentication and Authorization
- Authenticate users before Read operation and ensure only priviledged users can Update or Delete

#### Data Management
- Implement an actual database for data storage. eg, Postgres or MongoDB
- Complete update and delete functionalities for priviledged users

### User Experience

- Add buttery smooth animations and styles
- Added accessibility features
- Added internationalization support for multi languages and currencies
- Add all CRUD operations according to access rights

### Testing
- Increase test coverage
- Add end-to-end testing


### Thank you
I really had a lot of fun working on this, thank you for the opportunity 💃🏻