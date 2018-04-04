# leonardiwagner.github.io
my personal blog

- Run container
`docker build -t pages . && docker run --rm --label=github_pages -v="$PWD:/srv/jekyll" -it -p 127.
0.0.1:4000:4000 pages`
