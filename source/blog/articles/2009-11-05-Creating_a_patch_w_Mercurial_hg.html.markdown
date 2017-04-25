---
title: Creating a patch w/ Mercurial hg
date: 2009-11-05
---

Although I was a slow adopter, I am now an adamant git user. I won't go into all the details here, but git is a great distributed version control system (vcs), light years ahead of the last generation (cvs, svn), and honestly if it isn't too cost prohibitive, I would greatly recommend switching to it (the Linux kernel tree was moved to git, so I can't really see why anyone else wouldn't be able to).

Although I've never used it before, I've also heard alot of great things about the Mercurial (hg) distributed version control system. Recently one of the projects I was working on for work required me to use mercurial, so I've started getting up to speed.

One thing that took me a few minutes to discover is how to replate the git format-patch command w/ hg. eg with git, to see a list of all commits and then format a patch from the last one, run:

<code>
  git log
  git log HEAD^ -p
  git format-patch HEAD^
  git send-email 001-patchname.patch
  git send-email HEAD^ # alternatively
</code>

Doing the same w/ HG:

<code>
  hg log # note this isn't paginated, a feature git has over hg imo
  hg log -r tip -p
  hg email -r tip
</code>

This is <a href="http://wiki.sympy.org/wiki/Git_hg_rosetta_stone">good starting place</a> for those familiar w/ hg or git and are trying to use the other.
