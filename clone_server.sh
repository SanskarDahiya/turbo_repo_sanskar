TEMP_DIR=nazdeekiya1

cd apps
mkdir -p nazdeekiya
touch nazdeekiya/.gitkeep
git clone https://github.com/SanskarDahiya/scribble_project_1.git $TEMP_DIR
mv $TEMP_DIR/* $TEMP_DIR/.* nazdeekiya


echo ">"$(cat nazdeekiya/package.json | grep "version")
# git checkout main
cd ..
