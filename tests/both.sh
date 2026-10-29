# Runs the eval on the tuning set and the held-out set:  bash tests/both.sh [--detail]
cd "$(dirname "$0")/.."
echo "=== tuning set"; node tests/eval.js | sed -n '1,11p'
cp tests/answers.json tests/_tune.json; cp tests/holdout-answers.json tests/answers.json
echo "=== held-out set"; node tests/eval.js $1; cp tests/_tune.json tests/answers.json; rm tests/_tune.json
