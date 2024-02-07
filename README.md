# jdf-30x30-step6

This project was generated via the following script

```shell
#!/bin/bash
# Jesse Flygare 02/06/2024
# https://angular.io/guide/setup-local
# https://vercel.com/docs/cli
# requires
#    nvm (brew install nvm)
#    gh (brew install gh)
#    code (brew install --cask visual-studio-code)
set -e

proj_name=jdf-30x30-step6
proj_dir="$( pwd )/${proj_name}"

nvm_ver="20"
ng_ver="17.1.1"
vercel_ver="33.4.1"

this_script="$( pwd )/$( basename $0 )"

. "$NVM_DIR/nvm.sh"
nvm use ${nvm_ver}

# Run the ng cli commands to initialize the angular project for development
# this is only run once
function ng_setup() {
  # Create initial project
  npx --yes @angular/cli@${ng_ver} new ${proj_name} \
    --skip-tests \
    --create-application=false

  cd "${proj_dir}"

  npx ng add @angular-eslint/schematics \
    --defaults \
    --skip-confirmation

  npx ng generate application ${proj_name} \
    --skip-tests \
    --defaults

  npx ng add @angular/material \
    --project ${proj_name} \
    --defaults \
    --skip-confirmation

  # Generate home navigation component
  # https://material.angular.io/guide/schematics#navigation-schematic
  npx ng generate @angular/material:navigation home \
    --project ${proj_name} \
    --routing \
    --defaults \
    --skip-tests \
    --style=css \
    --standalone \
    --export

  npx ng generate lib lib-ui \
    --defaults

  # Generate list component
  npx ng generate component student-list \
    --project lib-ui \
    --defaults \
    --skip-tests \
    --style=css

  # Generate detail component
  npx ng generate component student-detail \
    --project lib-ui \
    --defaults \
    --skip-tests \
    --style=css

  # Generate dashboard component
  # https://material.angular.io/guide/schematics#dashboard-schematic
  npx ng generate @angular/material:dashboard student-dashboard \
    --project lib-ui \
    --defaults \
    --skip-tests \
    --style=css \
    --standalone \
    --skip-import

  # Generate 404 component
  npx ng generate component page-not-found \
    --project lib-ui \
    --defaults \
    --skip-tests \
    --style=css

  # Generate login component
  npx ng generate component login \
    --project lib-ui \
    --defaults \
    --skip-tests \
    --style=css

  npx ng generate lib lib-core \
    --defaults

  # Generate interface for model
  npx ng generate interface model/student \
    --project lib-core

  # Generate enum for courses
  npx ng generate enum model/course \
    --project lib-core

  # Generate login component
  npx ng generate service services/students \
    --project lib-core \
    --defaults \
    --skip-tests
}

# Update the README.md to include the contents of this script
function update_readme() {
  cat << EOF > ${proj_dir}/README.md
# ${proj_name}

This project was generated via the following script

\`\`\`shell
$( cat ${this_script} )
\`\`\`
EOF
}

# Create inital git repo
if [ ! -d "${proj_dir}" ]
then
  git init --initial-branch=master "${proj_dir}"

  # Run the ng cli commands
  ng_setup

  cd "${proj_dir}"

  echo '
# Ignore .nx dir created by VSCode plugin if installed
.nx/' >> .gitignore

  update_readme

  git add --all
  git commit -m "Initial commit"

  # Login to github if not already logged in
  gh auth status >/dev/null 2>&1 || gh auth login

  # Create github repo from local repo
  gh repo create "${proj_name}" \
    --public \
    --source=. \
    --remote=upstream \
    --disable-issues \
    --disable-wiki \
    --push

  # Create develop branch
  git checkout -b develop
  git push --force --set-upstream upstream develop

  # Login to vercel if not already loged in
  npx --yes vercel@${vercel_ver} whoami >/dev/null 2>&1 || npx vercel@${vercel_ver} login --github

  # Create project if it does not exist and link
  if ! npx vercel@${vercel_ver} project ls 2>&1 | grep "${proj_name}" >/dev/null
  then
    npx vercel@${vercel_ver} link --yes
  fi

  # open VSCode in workspace
  # disable NxConsole extension if installed
  code --disable-extension nrwl.angular-console .

  # Start server in new terminal and open browser
  osascript -e "tell app \"Terminal\"
    do script \"cd ${proj_dir} && . "${NVM_DIR}/nvm.sh" && nvm use 20 && npx ng serve --open\"
  end tell"
else
  cd "${proj_dir}"
  git checkout develop
fi

# Include any changes to this script
update_readme

# Ensure project passes linting
npx ng lint

# Checkin any git updates
# and redeploy to vercel
if [[ `git status --porcelain` ]]
then
  git add --all
  git commit --allow-empty-message --no-edit
  git push

  npx vercel@${vercel_ver} deploy --yes --prod
  # open in browser
  npx vercel@${vercel_ver} project ls 2>&1 | grep "${proj_name}" | awk '{print $2}' | xargs open
fi
```
