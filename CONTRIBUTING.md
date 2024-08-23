# Contributing to `stats.jenkins.io`

Thank you for considering contributing to the `stats.jenkins.io` project! We welcome all kinds of contributions, whether it's reporting a bug, suggesting an enhancement, or submitting code. This guide will help you get started with contributing to the repository.

## Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Getting Started](#getting-started)
3. [Branching Strategy](#branching-strategy)
4. [Commit Messages](#commit-messages)
5. [Code Style and Best Practices](#code-style-and-best-practices)
6. [Issue Tracking](#issue-tracking)
7. [Pull Request Process](#pull-request-process)
8. [Running Tests](#running-tests)
9. [Updating Documentation](#updating-documentation)
10. [Code of Conduct](#code-of-conduct)
11. [Community and Communication](#community-and-communication)

## How to Contribute

You can contribute to `stats.jenkins.io` in several ways:

-   **Reporting Bugs:** If you find a bug, please report it by [creating an issue](#issue-tracking).
-   **Suggesting Enhancements:** If you have an idea to improve the project, feel free to [open an issue](#issue-tracking) with your suggestion.
-   **Submitting Code:** If you're comfortable with coding, you can submit a pull request (PR) with bug fixes, features, or other improvements.
-   **Improving Documentation:** Documentation is key to a healthy project. You can contribute by updating existing docs or adding new ones.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (LTS version recommended)
-   **npm** or **yarn** (latest stable version)

### Installation

1. **Fork the repository** to your GitHub account.
2. **Clone your forked repository** to your local machine:
    ```bash
    git clone https://github.com/your-username/stats.jenkins.io.git
    ```
3. **Navigate to the project directory**:
    ```bash
    cd stats.jenkins.io
    ```
4. **Install dependencies**:
    ```bash
    npm install
    ```
5. **Run the project locally**:
    ```bash
    npm start
    ```

Your local instance of the project should now be up and running!

## Branching Strategy

We follow a simple branching strategy:

-   `main` is the stable branch. All new features or bug fixes should be branched off from `main` and merged back into `main` after review.
-   **Feature branches:** For new features, create a branch named `feature/your-feature-name`.
-   **Bugfix branches:** For bug fixes, create a branch named `bugfix/your-bugfix-name`.
-   **Hotfix branches:** For critical fixes, use `hotfix/your-hotfix-name`.

## Commit Messages

Please write meaningful and descriptive commit messages. Follow this structure:

-   **Type:** A short description of the change.
-   **Body:** A detailed explanation of what was done and why (optional).
-   **Footer:** Reference to any issues fixed or relevant notes (optional).

Example:

```
feat: add new chart for plugin trends

Added a new echarts-based line chart to display plugin trends over time.
```

## Code Style and Best Practices

-   Follow the existing coding style and conventions.
-   Use consistent indentation and formatting.
-   Write comments where necessary, especially for complex logic.
-   Avoid introducing unnecessary dependencies.

## Issue Tracking

-   **Reporting Issues:** To report a bug or request a feature, [create a new issue](https://github.com/jenkins-infra/stats.jenkins.io/issues/new).
-   **Labels:** Issues are categorized with labels. Please use the appropriate label when creating or working on issues.
-   **Assigning Issues:** You can assign an issue to yourself by leaving a comment on the issue or requesting assignment.

## Pull Request Process

1. **Fork and clone the repository** (if you haven’t already).
2. **Create a new branch** for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes** and commit them with a meaningful message.
4. **Push your changes** to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Create a pull request** from your fork’s branch to the `main` branch of the original repository.
6. **Participate in the review process:** Be responsive to feedback and make necessary adjustments.
7. **Merge after approval:** Once your PR is approved, it will be merged into `main`.

## Running Tests

Before submitting a PR, ensure that all tests pass:

```bash
npm test
```

If you are adding new functionality, please add corresponding tests.

## Updating Documentation

If you make changes to the code that affect the documentation, please update the relevant docs in the `docs/` directory. This ensures that everything stays in sync and new contributors have accurate information.

## Code of Conduct

This project follows the [Jenkins Code of Conduct](https://www.jenkins.io/project/governance/code-of-conduct/). By participating, you are expected to uphold this code. Please report any unacceptable behavior to the project maintainers.

## Community and Communication

If you have questions or need help:

-   **GitHub Discussions:** Post your questions in [GitHub Discussions](https://github.com/jenkins-infra/stats.jenkins.io/discussions).
-   **Slack:** Join the Jenkins Slack channel `#jenkins-infra` to chat with the community.
-   **Mailing List:** You can also use the Jenkins Developers mailing list for more in-depth discussions.
