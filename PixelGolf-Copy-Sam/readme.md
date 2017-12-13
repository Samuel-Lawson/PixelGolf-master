Pixel Golf
====

Welcome to the Pixel Golf repository.

This is a group project developed by students at the Fallibroome Academy.

Getting started
----

**Dependencies**

Node and Node Package Manager (npm) must be installed.

https://www.npmjs.com/get-npm

You may also need to install the Gulp-CLI:

https://gulpjs.com/

**Installing**

<ol>
<li>Clone this repository to your machine.</li>
<li>Open terminal / CMD in the project folder</li>
<li>Run <code>npm install</code></li>
</ol>

This will install all of the dependencies needed to build and run the project.

**Development**

We use the Gulp task runner to speed up development. It will launch the app inside of
a Browser Sync instance that will auto refresh each time you make a change.

To fire up the development environment, open the root folder (where the gulpfile.babel.js resides)
and run <code>gulp</code>. A new browser tab will open up at http://localhost:3000/ which points
to the /build/ folder in the solution.

All source code is in the /src/ folder. When you make changes to these files they will automatically
compile to the /build/ folder.

<strong style="color: red;">Do not make changes within the /build/ folder!</strong> Various hooks
will trigger a clean and rebuild, so any changes will be lost.

**Running**

The app will run as a standalone application, simply open /build/index.html.

Contributing to this project
----

<i>We suggest using <a href="https://www.sourcetreeapp.com/">SourceTree</a> to help you make checkins easier.</i>

We use the <a href="https://danielkummer.github.io/git-flow-cheatsheet/">Git Flow</a> model on this repository, using the following branches:

<code>/master</code>

<code>/hotfixes/{hotfix-name}</code>

<code>/development/</code>

<code>/feature/{feature-name}</code>

New features should be developed in their own 'feature' branch, for example <code>feature/water-hazards</code>.

When features are complete, merge the latest development changes INTO the feature branch and address any conflicts.
Once all conflicts are addressed, and you have confirmed that the feature still works as intended, switch to the
<code>development</code> branch and merge the feature INTO the development branch.

Push your changes up to GitHub on the regular to avoid loss. You can push changes to feature branches without
blocking / messing up other people.

<strong style="color: red;">Do not commit to the master branch.</strong>

**Remember:** The <code>development</code> branch is the 'single source of truth' for features in development.
