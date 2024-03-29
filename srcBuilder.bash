#! /bin/bash

toDeno=("src/About/About.tsx" "src/Errors/NotFound.tsx" "src/MainPage/MainPage.tsx" "src/Work/Work.tsx" "src/Works/Works.tsx")
fromDeno=("dist/DenoAbout.js" "dist/DenoNotFound.js" "dist/DenoMainPage.js" "dist/DenoWork.js" "dist/DenoWorks.js")
fromEsbuild=("dist/About.js" "dist/NotFound.js" "dist/MainPage.js" "dist/WorkWrapper.js" "dist/Works.js")

# Deno Bundle functions
function _createDenoBundle() {
    maxTimeout=10
    counter=0

    deno bundle --no-check $1 $2
    
    function verifyCreation() {
        if [ -f "$1" ]; then
            return 0
        fi
        if [ $counter -eq $maxTimeout ]; then
            return 1
        fi
        ((counter++))
        sleep 1
        verifyCreation
    }
    verifyCreation $2
    return $?
}

function createDenoBundle() {
    _createDenoBundle $1 $2
    if [ $? -ne "0" ]; then
        echo "There was an error! Something wasn't bundled correctly"
    fi
}

# Esbuild Bundle functions
function _createEsbuildBundle() {
    maxTimeout=3
    counter=0
    outfile="--outfile=$2"

    ./node_modules/.bin/esbuild --bundle $1 --minify $outfile

    function verifyCreation() {
        if [ -f "$1" ]; then
            return 0
        fi
        if [ $counter -eq $maxTimeout ]; then
            return 1
        fi
        ((counter++))
        sleep 1
        verifyCreation
    }
    verifyCreation $2
    return $?
}

function createEsbuildBundle() {
    _createEsbuildBundle $1 $2
    if [ $? -ne "0" ]; then
        echo "There was an error! Something wasn't bundled correctly"
    fi
    rm $1
}

# Sass compiler function

function compileSass() {
    ./node_modules/.bin/sass styles/index.scss dist/index.css
}

# Astro compiler function

function compileAstro() {
    ./node_modules/.bin/astro build
}

# Bundle creator function
# It will create the bundles from Deno first
# and then those bundles with will bundled again with esbuild
# It's pretty fast everything
function createBundles() {
    for i in ${!toDeno[@]}; do
        createDenoBundle ${toDeno[$i]} ${fromDeno[$i]}
    done
    for i in ${!fromDeno[@]}; do
        createEsbuildBundle ${fromDeno[$i]} ${fromEsbuild[$i]}
    done
    compileSass
    compileAstro
}

createBundles

echo "All has been executed"