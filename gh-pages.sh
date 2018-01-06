# This shell script force pushes only all the ./<version> directories to the gh-pages branch

# CAUTION: DO NOT RUN THIS UNLESS WORKING TREE IS CLEAN!!!

git checkout master

# build the latest version into ./<version>/build
gulp

git branch -D gh-pages
git checkout -b gh-pages

# stage deletion of all files except except these untracked directories
git rm $(ls -A1 | egrep -v '^[0-9]|^(\.git|\.idea|node_modules)$')

# stage all ./<version> directories
git add $(ls -A1 | egrep '^[0-9]')

git commit -am 'push build files'
git push -f origin gh-pages

# undo commit, in particular of ./<version> directories
git reset HEAD^

# clear staged changes, so .gitignore once again ignores ./<version> directories
git reset --hard

git checkout master
