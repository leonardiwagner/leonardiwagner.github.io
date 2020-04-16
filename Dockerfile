FROM jekyll/jekyll:pages
ADD ${PWD} /srv/jekyll
EXPOSE 4000
CMD jekyll serve -V --watch --force_polling --incremental
