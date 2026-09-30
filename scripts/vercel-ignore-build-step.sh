#!/bin/sh
# Vercel Ignored Build Step.
# Exit 0 skips the build. Exit 1 continues the build.
# Default is skip. A build runs only when the commit message contains the tag below.
tag="[vercel deploy francescanadialupo-site]"
msg="${VERCEL_GIT_COMMIT_MESSAGE:-}"

case "$msg" in
  *"$tag"*)
    echo "Deploy tag present: $tag"
    exit 1
    ;;
  *)
    echo "no vercel tag: skip build"
    exit 0
    ;;
esac
