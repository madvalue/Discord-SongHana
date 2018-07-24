@echo off
title SongHana

:run_bot
	echo Rozpoczęto procedure uruchamiania bota SongHana
	node main.js

echo Wykryto crash bota, ponowne uruchamianie!
goto run_bot

pause