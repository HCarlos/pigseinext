#!/usr/bin/env bash

# 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

# pwd : postg  =      R=D7,Z)$F%q,Kj?CP,DM{1CFNTtQ1B@4=V!d


echo "# API Rest Full" >> README.md
echo "## pigseinext" >> README.md
git init
git add README.md
git commit -m "Init Commit"
git remote add origin https://github.com/HCarlos/pigseinext.git
git push -u origin main

echo "" > .gitignore
git add .gitignore
git commit -m "message" .gitignore

git remote set-url origin https://github.com/HCarlos/pigseinext.git
git config --global user.email "r0@tecnointel.mx"
git config --global user.name "HCarlos"
git config --global color.ui true
git config core.fileMode false
git config --global push.default simple

git checkout main

git status

git add .

git commit -m "Init Commit"

git push -u origin main --force

exit
