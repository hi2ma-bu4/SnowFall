@echo off
chcp 932 > nul
rem ANSI�ŕۑ����܂��傤

:restart
cd "%~dp0"

call npm run build
if not "%ERRORLEVEL%"=="0" (
    echo.
    echo. �G���[!
    pause
    goto :restart
)



echo.
echo.
echo. 1. �Ď��s
echo. 2. �I��
echo.
choice /C 12
Set err="%ERRORLEVEL%"
if %err%=="1" (
    goto :restart
) else if %err%=="2" (
    exit /b 0
)

exit /b 0

