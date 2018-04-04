FROM jekyll/jekyll:pages
ADD ${PWD} /srv/jekyll
EXPOSE 4000
CMD jekyll serve --watch --force_polling --incremental
