# 📘 CONTRIBUTING.md

## 🚀 Welcome

Thanks for contributing!
This document explains how to set up the project, make changes, and submit clean pull requests.

---

# 1. 🔀 Branching Workflow

We use a lightweight but scalable Git workflow designed for team collaboration and continuous delivery.

## 🌳 Main branches

### **`main`**

* Always stable and deployable.
* Code here must be production-ready.
* PRs should **never** be merged directly into `main` unless part of a release process.

### **`dev`**

* The integration branch.
* All feature work is merged here first.
* Represents the upcoming version that isn’t yet live.

This separation ensures:

* `main` stays clean and deployable,
* `dev` gathers work safely before releases,
* contributors don't step on each other’s work.

---

## 🌱 Working branches

When adding a feature or fixing a bug, create a **new branch from `dev`**.

Use a clear prefix to communicate intent:

```
feature/<short-name>    → New features or enhancements
fix/<short-name>        → Bug fixes
refactor/<short-name>   → Cleanups without behavior changes
chore/<short-name>      → Maintenance (deps, config changes)
docs/<short-name>       → Documentation changes
```

### Examples

```
feature/add-dashboard-cards
fix/login-redirect
refactor/user-service
docs/improve-readme
```

### Why prefixes matter

* They make PRs instantly understandable.
* They help group related changes in analytics/tools.
* They support release automation and changelog generation.

**Rule of thumb:**
Your branch name should describe *what* you’re doing, not *how* you're doing it.

---

# 2. 🧹 Code Style

## Formatting

We use:

* **ESLint**
* **Prettier**
* **TypeScript strict mode**

### Run formatting

```sh
pnpm lint
pnpm format
```

---

# 6. 💬 Commit Messages (recommended)

We follow the **Conventional Commits** specification.

## 🎯 Why Conventional Commits?

This style:

* Makes commit history easier to scan.
* Enables automatic changelog generation (via `release-it`).
* Helps classify changes into features/fixes/breaking changes.
* Keeps the project maintainable at scale.

## ✍️ Format

```
<type>: <short description>
```

### Common types

| Type       | Purpose                                           |
| ---------- | ------------------------------------------------- |
| `feat`     | Add a new feature                                 |
| `fix`      | Fix a bug                                         |
| `refactor` | Improve code structure without changing behavior  |
| `chore`    | Maintenance tasks (configs, deps)                 |
| `docs`     | Documentation updates                             |
| `test`     | Add or modify tests                               |
| `style`    | Formatting-only changes (rare thanks to Prettier) |

### Examples

```
feat: add user activity widgets
fix: handle expired tokens in backend
refactor: simplify dashboard card layout
chore: update dependencies
docs: add CONTRIBUTING guide
```

### 🔥 Extra rules

* Use the imperative mood (“add”, not “added”).
* Keep the title short (< 72 characters).
* If the commit is large or complex, add a short body:

```
feat: introduce activity feed API

This adds new endpoints for retrieving user activity.
Includes pagination, filtering, and mock data for testing.
```

---

# 7. 📥 Pull Request Rules

1. Your branch must come **from `dev`**.
2. Your PR must merge **into `dev`**.
3. Include:

   * Clear title
   * Summary of changes
   * Screenshots for UI changes
4. Lint + tests must pass.
5. Request review from **at least one teammate**.

### PR size guideline

Small PRs (ideally <300 LOC) are easier to understand, review, and merge.

---

# 8. 🔎 Code Review Guidelines

When reviewing a PR, ask:

* Does the code follow our conventions?
* Are types correct and explicit?
* Is logic tested?
* Does anything break existing features?
* Is the UI consistent with the design system?
* Does backend code follow NestJS architecture?

Focus reviews on correctness, clarity, and maintainability — not personal preferences.

---

# 10. 🐛 Reporting Issues

Include:

* description
* screenshots
* steps to reproduce
* expected behavior