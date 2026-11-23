# Blog workflow

## Post content

Edit real posts, including their front matter and assets, only with explicit user permission. Use existing posts as read-only regression examples and put test content in `source/_posts/test-formula.md` or in temporary fixtures in the preview worktree.

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
