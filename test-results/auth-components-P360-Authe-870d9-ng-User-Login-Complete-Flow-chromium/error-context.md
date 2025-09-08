# Page snapshot

```yaml
- generic [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "P360" [ref=e6] [cursor=pointer]:
        - /url: /
        - heading "P360" [level=1] [ref=e7] [cursor=pointer]
      - heading "Welcome Back" [level=2] [ref=e8]
      - paragraph [ref=e9]: Sign in to your P360 account to continue
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: Email address
          - textbox "Email address" [ref=e14]: existing.user@p360.com
        - generic [ref=e15]:
          - generic [ref=e16]: Password
          - textbox "Password" [active] [ref=e17]: UserPassword123!
      - button "Sign In" [ref=e19] [cursor=pointer]
      - generic [ref=e20]:
        - link "Create an account" [ref=e21] [cursor=pointer]:
          - /url: /auth/signup
        - link "Skip to Campaigns →" [ref=e22] [cursor=pointer]:
          - /url: /dashboard/campaigns
    - paragraph [ref=e24]:
      - strong [ref=e25]: "Demo Mode:"
      - text: Use any email/password to login and test the fixed P360-67 campaigns UI!
```