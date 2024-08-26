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
    npm run dev
    ```

Your local instance of the project should now be up and running!

## Branching Strategy

We follow a simple branching strategy:

-   `main` is the stable branch. All new features or bug fixes should be branched off from `main` and merged back into `main` after review.
-   **Feature branches:** For new features, create a branch named `feature/your-feature-name`.
-   **Bugfix branches:** For bug fixes, create a branch named `bugfix/your-bugfix-name`.

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

-   **Reporting Issues:** To report a bug or request a feature, [create a new issue](https://github.com/jenkins-infra/stats.jenkins.io/issues/new/choose).

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

We have an automated testing pipeline integrated with Jenkins CI/CD that will automatically run a series of checks when you submit a pull request. Here are the key checks that will be performed:

-   **Jenkins Build:** Ensures that the code builds successfully and passes all tests.
-   **Typos Check:** Automatically checks for any spelling or typographical errors in the codebase.
-   **Continuous Integration:** Confirms that the changes in the commit are valid and can be merged.
-   **PR Merge Validation:** Validates that the commit can be successfully merged into the main branch.

These checks are performed by our Jenkins bots, such as `ci-jenkins-io[bot]` and `infra-ci-jenkins-io[bot]`, which will provide detailed feedback on your pull request.

## Updating Documentation

If you make changes to the code that affect the documentation, please update the relevant docs in the `docs/` directory. This ensures that everything stays in sync and new contributors have accurate information.

## Code of Conduct

This project follows the [Jenkins Code of Conduct](https://www.jenkins.io/project/conduct/). By participating, you are expected to uphold this code. Please report any unacceptable behavior to the project maintainers.

## Community and Communication

If you have questions or need help, the Jenkins community offers several channels for communication. For more detailed information on how to connect with the Jenkins community, please visit the following page:

[Participate and Connect - Jenkins Community](https://www.jenkins.io/participate/connect/)
