<!--------------------------------------------------------------------------
👉 STEP 1: We thoughtfully review both implementation AND feature design.
     If you are making a nontrivial change, it's recommended to first create
     a GitHub issue and get feedback on your proposed design.
--------------------------------------------------------------------------->

## Summary

<!--------------------------------------------------------------------------
👉 STEP 2: In a few sentences, write a summary explaining:

     From the perspective of an end user, what problem are you solving?
     What did you change?

     If you already described the problem in some issue, no need to repeat here,
     you can add the magic phrase "Fixes #1234" to automatically link and close 
     the issue #1234 when your PR is merged.
--------------------------------------------------------------------------->

## Implementation

<!--------------------------------------------------------------------------
👉 STEP 3: Provide additional details about your fix or feature:

     How did you solve the problem?
     Mention any alternate approaches you considered.
     Did you completely solve the problem, or are some cases not handled yet?
     Does this change break backwards compatibility?
     Could any aspects of your change impact performance?
--------------------------------------------------------------------------->

## Testing

<!--------------------------------------------------------------------------
👉 STEP 4: What test cases did you use to validate your work? Did you write unit or
    integration tests?
--------------------------------------------------------------------------->

- [ ] Unit tests were added to cover the new feature or bug fix (+ eventually integration tests, but unit should be preferred whenever its possible).

## Impacted documentation

<!--------------------------------------------------------------------------
👉 STEP 5: skott is using changesets so if this PR introduces a new behavior or fixes a bug 
    a changeset should be generated using `pnpm changeset` at the root of the workspace.
--------------------------------------------------------------------------->

- [ ] Changesets were generated using `pnpm changeset` at the root of the workspace, affected packages are being bumped (either patch/minor) and a clear description for each of the affected packages was added.
