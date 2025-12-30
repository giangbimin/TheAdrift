---
description: Workflow: Build and Port Validation
---

1. **Pre-check:** - Check if port 5173 is active. If yes, reuse; if not, `npm run dev`.
2. **Execute Change:** Apply code modifications.
3. **Validation:** - Run `npm run build`.
   - IF FAIL: 
     - Capture error output.
     - Append to `dev_error.log`.
     - Attempt fix #1. If fail, attempt fix #2.
     - IF FAIL after #2: STOP and notify user.
4. **Success:** - Run `npm run preview` to confirm bundle integrity.
   - Do NOT use browser agent.