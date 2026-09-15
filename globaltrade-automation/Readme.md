# 🎭 GlobalTrade Logistics — Playwright Automation

End-to-end test automation for the GlobalTrade Logistics 
Supply Chain Management System built with Playwright.

## Tech Stack
- Playwright + JavaScript
- Node.js v22.18.0
- Chromium Browser

## Test Results
- 36 tests total
- 33 passed, 3 flaky (all passed on retry)
- 0 failed

## Test Coverage
| Suite | Tests |
|-------|-------|
| Authentication | 6 |
| Shipments | 6 |
| Vendors | 5 |
| Inventory | 6 |
| Customs | 5 |
| Role Based Access | 4 |
| Performance | 4 |
| **Total** | **36** |

## Setup
```bash
npm install
npx playwright install chromium
```

## Run Tests
```bash
npx playwright test
```

## View Report
```bash
npx playwright show-report reports
```

## Application
Tested against GlobalTrade Supply Chain System
running on GlassFish 7 at http://localhost:8080/globaltrade/

## Related Repository
[GlobalTrade Supply Chain System](https://github.com/your-username/globaltrade-supply-chain)
