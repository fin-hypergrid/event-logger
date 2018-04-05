# run from master branch!

npm run wrap

VER=$(cat package.json | sed -En 's/.*"([0-9]+\.[0-9]+\.[0-9]+)".*/\1/p')
mkdir $VER
mkdir $VER/build
mv fin-*.js $VER/build

git branch -D gh-pages
git checkout -b gh-pages
rm .gitignore .npmignore README.md *.js *.sh *.json
git add $VER
git status
git commit -am $VER

git push origin -f gh-pages

git checkout master
