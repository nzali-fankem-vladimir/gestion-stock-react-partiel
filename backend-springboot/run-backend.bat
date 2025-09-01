@echo off
echo Démarrage du backend Spring Boot...
echo.

cd /d "%~dp0"

if not exist "target\classes" (
    echo Compilation du projet...
    call mvn clean compile
    if errorlevel 1 (
        echo Erreur lors de la compilation
        pause
        exit /b 1
    )
)

echo Démarrage de l'application...
java -cp "target\classes;target\dependency\*" com.gestionstock.backend.GestionStockApplication

pause