TEMP_DIR=nazdeekiya1

cd apps

VV=$(echo 'Z2hwX3lPYmFrdEtPNFFTVFg1TGtuOWF3UTNoMzBtZExuWjJLVDZTdgo='| base64 --decode)

git clone https://$VV@github.com/SanskarDahiya/scribble_project_1.git $TEMP_DIR
mv $TEMP_DIR/* nazdeekiya
echo ">"$(cat nazdeekiya/package.json | grep "version")
# git checkout main
cd ..
