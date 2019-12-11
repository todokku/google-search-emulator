#!/bin/bash
emulate() {
a="var strings = ["
b="];"
IP=$(curl http://emulator.organisedway.com/api.php?site_name=balwinder)
strings=$a$IP$b
echo "$strings" | cat - custom.js > temp1 && mv temp1 cust.js
proxy=$(echo $IP | jq '.proxy')
ua=$(echo $IP | jq '.navigator_userAgent')
device=$(echo $IP | jq '.device')
height=$(echo $IP | jq '.window_screen_height')
width=$(echo $IP | jq '.window_screen_width')

node example.js cust.js "$proxy" "$ua" "$height" "$width" "$device"
}
export -f emulate
seq 1 | parallel -j1 -q emulate "{}"
