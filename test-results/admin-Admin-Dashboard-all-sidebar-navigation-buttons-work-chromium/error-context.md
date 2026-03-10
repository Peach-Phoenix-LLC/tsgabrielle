# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - heading "Privacy Preferences" [level=3] [ref=e6]
      - paragraph [ref=e7]:
        - text: We use cookies to enhance your experience and analyze our traffic. You can choose to accept all cookies or reject non-essential ones. For more details, visit our
        - link "Do Not Sell or Share My Personal Information" [ref=e8] [cursor=pointer]:
          - /url: /privacy/do-not-sell
        - text: page.
    - generic [ref=e9]:
      - button "Accept All" [ref=e10] [cursor=pointer]
      - button "Reject All" [ref=e11] [cursor=pointer]
  - alert [ref=e12]
  - generic [ref=e13]:
    - heading "Something went wrong" [level=1] [ref=e14]
    - paragraph [ref=e15]: u.default.findDOMNode is not a function
```