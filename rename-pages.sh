#!/bin/bash

# Ensure we're in the right place
cd "$(dirname "$0")"

# Read CSV (skip header if any)
while IFS=',' read -r new_name _ old_name || [[ -n $old_name ]]; do
  # Trim whitespace
  new_name=$(echo "$new_name" | xargs)
  old_name=$(echo "$old_name" | xargs)

  # Skip empty
  if [[ -z "$new_name" || -z "$old_name" ]]; then
    continue
  fi

  # Add .jsx if missing
  [[ "$new_name" != *.jsx ]] && new_name="$new_name.jsx"
  [[ "$old_name" != *.jsx ]] && old_name="$old_name.jsx"

  src_file="src/pages/$old_name"
  dest_file="src/pages/$new_name"

  if [[ -f "$src_file" ]]; then
    echo "Renaming: $old_name → $new_name"
    mv "$src_file" "$dest_file"
  elif [[ -f "../aulice-unified-website-BACKUP/src/pages/$old_name" ]]; then
    echo "Restoring from backup: $old_name → $new_name"
    cp "../aulice-unified-website-BACKUP/src/pages/$old_name" "$dest_file"
  else
    echo "Creating placeholder: $new_name (source $old_name not found)"
    echo "export default () => <div>Page: $(basename "$new_name" .jsx)</div>;" > "$dest_file"
  fi
done < "Filenames dihotomy in new Aulice.csv"