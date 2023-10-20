HERE=$(pwd)
MYNAME=$(readlink -f $0)
THERE=$(dirname $(dirname $MYNAME))
(cd $THERE; ROOT=${HERE} yarn "$@")