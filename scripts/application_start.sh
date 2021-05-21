#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/storyar/StoryAR-backend

#navigate into our working directory where we have all our github files
cd /home/ubuntu/storyar/StoryAR-backend

# #add npm and node to path
# export NVM_DIR="$HOME/.nvm"	
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install

#install babel packages
npm i -g @babel/core @babel/node @babel/cli

#copy .env.example to .env
cp .env.example .env


#build package
npm run build

#run deployment
npm run deployment