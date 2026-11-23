# Blog workflow

## Post content

Edit real posts, including their front matter and assets, only with explicit user permission. Use existing posts as read-only regression examples and put test content in `source/_posts/test-formula.md` or in temporary fixtures in the preview worktree.

### Agent-ASSISTED writing

Follow the applicable skills in `.agents/skills/` explicitly. When creating, expanding, or substantially revising technical content, use `technical-documentation-writer-en`.

Before writing, ask the human author for the intended readers' profile and record it. Include their existing knowledge, goals, relevant tools, and known gaps. Do not infer a missing profile from the author's expertise or from the document's subject matter. Nothing shall be edited without human author's approval.

Every new explanation, theorem, example, or derivation step must be derivable from at least one of these sources:

- previous blog posts;
- material already established in the current post;
- the intended readers' profile supplied by the human author.

Material outside those sources requires explicit author approval. If new material needs an external theorem, name it, link a reference, and show why it is necessary in the reply. Do not present an unsupported statement as something the intended reader can derive.

## Theme preview

Keep reusable layouts, styles, and scripts in the [Kratos-Rebirth fork](https://github.com/sablin39/Kratos-Rebirth). Create an experimental branch from the fork’s `main`, then run `pnpm install --frozen-lockfile` and `pnpm run build` in the theme checkout.

Link the theme from a separate blog worktree. Keep the resulting pnpm override and lockfile changes in that preview worktree.

```text
git worktree add --detach ../blog-theme-preview HEAD
cd ../blog-theme-preview
pnpm link ../Kratos-Rebirth
pnpm run server
```

Use the formula test post for Mermaid and theme widgets. Use the RoPE post to check math in the article heading after opening it from the index. Rebuild the theme after editing it and restart Hexo after changing theme scripts or templates.

## Production

Merge verified theme changes into the fork’s `main`. In the regular blog checkout, refresh the dependency and verify the frozen install before committing the updated lockfile. Both GitHub Actions workflows install the recorded theme commit.

```text
pnpm update hexo-theme-kratos-rebirth
pnpm install --frozen-lockfile
pnpm run build --force
```
