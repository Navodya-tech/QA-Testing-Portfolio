# OrangeHRM – Test Plan

Project: OrangeHRM Demo  
Type: Manual Testing  
Scope: Admin/User side testing  
Version: 1.0  
Tester: Navodya  

---

## Test Environment

- Browser: Google Chrome  
- Version: 149.0.7827.115 (Official Build) (64-bit) 
- Device: Desktop / Laptop  
- OS: Windows 10  
- Environment: Public Demo Site  

Application URL: https://opensource-demo.orangehrmlive.com/

---

## Scope

### ✔ In Scope:
- Login / Logout functionality (Admin & Employee roles)
- Dashboard validation
- PIM (Employee Management) module
- Leave Management module
- Admin User Management module
- My Info (Profile management)
- UI validation across all modules
- Form validation and error handling
- Role-based access control testing

---

### ❌ Out of Scope:
- Backend/API testing
- Database validation
- Performance testing
- Security penetration testing
- Automation testing

---

## Test Approach

The following testing techniques will be used:

- Smoke Testing (basic system verification)
- Functional Testing (feature validation)
- UI Testing (layout, alignment, and usability checks)
- End-to-End Testing (complete workflow validation)
- Negative Testing (invalid inputs and error handling)
- Role-Based Testing (Admin vs Employee access validation)

---

## Test Management & Bug Tracking

- Test cases will be documented in Excel
- Test execution results will be tracked in Excel
- Defects will be logged and managed in **Jira**
- Each bug will include:
  - Steps to reproduce
  - Expected result
  - Actual result
  - Severity & priority
  - Screenshots as evidence
  - Jira ticket ID reference

---

## Entry Criteria

- Application URL is accessible
- Test cases are prepared and reviewed
- Test data is available 
- Test environment is stable

---

## Exit Criteria

- All critical test cases executed
- Major defects logged in Jira and tracked
- High severity issues reviewed
- Core modules validated successfully
- No blocking issues are documented

---

## Deliverables

- Test Plan 
- Test Scenarios 
- Test Cases 
- Bug Reports
- Test Execution Report 
- Evidence Screenshots 

---

## Risks & Assumptions

### Risks:
- Demo system may reset data frequently
- Limited control over test environment
- Session timeout or login issues
- Restricted functionality in demo version

### Assumptions:
- All modules are available in demo system
- System behaves similar to production HR system
- Admin role has full access permissions

---

## Tools Used

- Jira (Bug Tracking System)
- Excel (Test Cases & Execution)
- GitHub (Documentation & Evidence Storage)




