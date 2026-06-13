# 📋 Software Test Plan (STP) 

**Document ID:** NT-STP-2026-V1  
**Application:** New Tech M-Commerce (`lk.jiat.eshop`)  
**version:** v1.0.0
**Scope:** User Panel Only  
**Tester:** Navodya Hettiarachchi  
**Date:** 10/06/2026

---

## 1. Test Plan Identifier
`NT-STP-2026-V1`  
This is the test plan for the user side of the New Tech mobile application.

## 2. Introduction
This plan defines the testing strategy and rules for the New Tech Android application. The goal is to make sure the user interaction from login to completing a purchase works perfectly on a physical device before release.

## 3. Test Items
The specific software parts to be tested:
* **Package Name:** `lk.jiat.eshop` (User views only).
* **Code Components:** Activities, fragments, and adapters written in Java.

## 4. Features to be Tested (In Scope)
* **User Authentication:** Login and registration text fields, and staying logged in after closing the app.
* **Product Catalog:** Loading items from Firestore, category filtering, and smooth image slider swiping.
* **Shopping Cart:** Real-time subtotal price changes when adding or removing items.
* **Location Services:** Loading Google Maps and finding current device coordinates accurately.
* **Payment Pipeline:** Launching the PayHere SDK screen and handling payment results (Success/Cancel).

## 5. Features Not to be Tested (Out of Scope)
* **Admin Subsystem:** Admin login, stock management, and order tracking dashboards.
* **Production Payments:** Real money transactions (Strictly using the PayHere Sandbox).

## 6. Approach (Testing Strategy)
* **Functional Testing:** Manual testing to check if buttons, forms, and inputs give the correct outputs.
* **Integration Testing:** Checking data communication between the app and external APIs (Firebase, Google Maps, and PayHere SDK).
* **UI/UX Testing:** Making sure the **Bottom Navigation Bar** stays locked at the bottom of the screen across Home, Cart, and Profile layouts without shifting on a physical phone.

## 7. Item Pass/Fail Criteria

### 7.1 Defect Severity Levels
* **Critical:** App crashes, freezes completely, or login and payment loops fail.
* **Major:** A core feature is broken (like items not adding to the cart), but the app stays open.
* **Minor:** Visual bugs, text overlaps, or slow image loading.

### 7.2 Test Case Execution Thresholds
* **Pass Criteria:** A test case is marked as **PASS** only if the actual behavior on the physical device matches 100% of the expected results documented in the test script.
* **Fail Criteria:** A test case is marked as **FAIL** if there is any deviation from the expected result, layout shifting in core elements (like the bottom navigation bar), or input validation errors.

### 7.3 Exit Criteria
* **Execution Rate:** 100% of all drafted test cases must be executed and logged.
* **Pass Rate Target:** 100% of Critical and Major test cases must achieve a **PASS** status.
* **Allowed Defect Margin:** A maximum of 5% of test cases may remain failed *only* if the underlying bugs are classified as **Minor** and documented in the active issue log for a future patch.

## 8. Test Deliverables
* Master Software Test Plan (`test_plan/`)
* Test Scenarios (`test_scenarios/`)
* Detailed Test Case Sheets (`test_cases/`)
* Issue Tracker Log (`bug_reports/`)
