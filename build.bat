@echo off
chcp 932 > nul
rem ANSIで保存しましょう

:restart
cd "%~dp0"

call npm run build
if not "%ERRORLEVEL%"=="0" (
    echo.
    echo. エラー!
    pause
    goto :restart
)



echo.
echo.
echo. 1. 再実行
echo. 2. 終了
echo.
choice /C 12
Set err="%ERRORLEVEL%"
if %err%=="1" (
    goto :restart
) else if %err%=="2" (
    exit /b 0
)

exit /b 0

