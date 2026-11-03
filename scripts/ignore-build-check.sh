#!/usr/bin/env bash
# Skip the build when every changed file lives under content/ — those are CMS
# edits served by Tina at request time, so a rebuild changes nothing.
#
# Exit-code semantics differ per platform:
#   Vercel Ignored Build Step : exit 1 = build,  exit 0 = skip
#   Netlify ignore command    : exit 0 = build,  non-zero = skip
# Any uncertainty (missing refs, git failure) falls through to "build".

if [ -n "${VERCEL:-}" ]; then
  prev="${VERCEL_GIT_PREVIOUS_SHA:-}"
  cur="${VERCEL_GIT_COMMIT_SHA:-}"
else
  prev="${CACHED_COMMIT_REF:-}"
  cur="${COMMIT_REF:-}"
fi

content_only=0
if [ -n "$prev" ] && [ -n "$cur" ] && \
   changed="$(git diff --name-only "$prev" "$cur" -- 2>/dev/null)"; then
  content_only=1
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    case "$file" in
      content/*) ;;
      *) content_only=0; break ;;
    esac
  done <<EOF
$changed
EOF
fi

if [ -n "${VERCEL:-}" ]; then
  [ "$content_only" -eq 1 ] && exit 0 || exit 1
else
  [ "$content_only" -eq 1 ] && exit 1 || exit 0
fi
