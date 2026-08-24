@echo off
setlocal enabledelayedexpansion
title KYRON OS Configuration Wizard

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\kyron_configurator.ps1" "%~dp0"
exit /b %ERRORLEVEL%
