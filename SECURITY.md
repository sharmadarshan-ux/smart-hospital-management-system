# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | Yes                |

---

## Reporting a Vulnerability

If you discover a security vulnerability within this project:

1. **Do not create a public GitHub issue.**
2. Send an email to the project maintainer at [sharmadarshan237@gmail.com](mailto:sharmadarshan237@gmail.com) with the subject line `[SECURITY] QueueCare Vulnerability Report`.
3. Include detailed steps to reproduce the issue, proof of concept (if applicable), and potential impact.

You will receive an acknowledgment within 48 hours, followed by updates on triage and mitigation before any public disclosure.

---

## Best Practices for Deployment

- **Environment Isolation:** Keep all runtime variables in `.env.local` or environment variables on the host. Never check sensitive keys or API secrets into version control.
- **Intranet Deployment:** For hospital LAN usage, ensure the host machine runs behind a properly configured firewall with access restricted to trusted clinical subnets.
- **Dependency Health:** Automated Dependabot scans monitor all upstream npm dependencies for reported CVEs.
