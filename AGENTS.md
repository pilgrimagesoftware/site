# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static/legacy PHP website for pilgrimagesoftware.com. There is no build system, package manager,
linter, or test suite — every file under `public/` is served as-is by the PHP web server. Changes
are deployed by copying files to the production host, not via a build pipeline.

## Structure

- `public/` — document root. Top-level PHP files (`head.php`, `header.php`, `footer.php`) are the
  shared page chrome, included by every page's `index.php`.
- `public/<section>/index.php` (e.g. `about/`, `contact/`, `hire/`, `legal/`, `products/`) — one
  static page per site section.
- `public/products/<name>/` — one micro-site per product (apples, counsellor, hattip, horologe,
  proelia, sheets, snapper, sweetrpg, whatadish, yawp, etc). Some have an `index copy.php` left
  alongside `index.php` — treat `index.php` as the live version.
- `public/progress/` — a full WordPress install (its own `wp-config.php`, `wp-admin`, plugins). This
  is a separate application embedded in the site, not related to the rest of the codebase.
- `public/shimmer/` — a self-contained legacy PHP app (a software update/licensing server). Routes
  by `$_GET` flow parameter through `flow.php`, which dispatches to `flows/*.php` (e.g. `?ajax=`,
  `?download=`, `?api=`, `?appcast=`). `db_details.php` holds its MySQL credentials.
  `caches/` holds generated cache files as flat hash-named files.

## Gotchas

**Hardcoded absolute server paths**: Page includes use the production filesystem path directly,
e.g. `include '/home/pilgrimagesw/pilgrimagesoftware.com/public/head.php'`, rather than a relative
path or `$_SERVER['DOCUMENT_ROOT']`. Every page (`index.php`, `about/index.php`, `contact/index.php`,
etc.) repeats this same absolute path. If the deployment path ever changes, all of these need
updating together. `dl.php` uses a different, inconsistent account path (`pilgrimsoft` vs
`pilgrimagesw` elsewhere) — treat that file's path as unreliable/stale rather than a second valid
convention.

**No secrets hygiene**: `public/shimmer/db_details.php` contains a plaintext production database
password committed directly to the repo, and there is no `.gitignore`. Do not add further
credentials this way — if you touch this file, flag it rather than propagating the pattern.
