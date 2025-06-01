# Contributing

We appreciate your contributions! To ensure a smooth and consistent development process, please follow these guidelines.

## Commit Messages

All commit messages should adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps in automating changelog generation and makes the commit history more readable.

**Format:**

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Examples:**

- `feat: add new login button`
- `fix(template-ts-lib): resolve issue with user authentication`
- `docs: update README with setup instructions`
- `chore: upgrade dependencies`

## Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs for our packages. When you make a change that should be included in a release, you need to add a changeset.

**Workflow:**

1. **Make your code changes.**
2. **Commit your changes** following the Conventional Commits format.

   ```shell
   git commit -m "feat: implement user profile page"
   ```

3. **Add a changeset:**
   Run the following command in your terminal:

   ```shell
   pnpm changeset
   ```

   Changeset will then prompt you to:

   - Select which packages have been affected by your changes.
   - Choose the type of change for each package (major, minor, or patch).
   - Write a brief description of the change. This description will be used in the changelog.

   This will generate a new Markdown file in the `.changeset` directory (e.g., `.changeset/unique-name.md`).

4. **Commit the changeset file:**
   Add the generated changeset file to Git and commit it.

   ```shell
   git add .changeset/*.md
   git commit -m "docs: add changeset for user profile feature"
   ```

   It's good practice to use a `docs` or `chore` type for changeset commits, as they don't represent direct code changes but rather metadata about the changes.

## Pull Requests (PRs)

When you are ready to submit your changes:

1. **Push your branch** to the remote repository.
2. **Create a Pull Request.**
3. **The PR title must also follow the Conventional Commits format.** This title is often used as the commit message when merging the PR.
   - Example: `feat: Implement user profile page and related settings`

By following these guidelines, you help us maintain a clean and organized project. Thank you for your contribution!
