# Minimal local HTTP server for SiteTLCM / Site-LCM
# Usage: .\scripts\serve.ps1 [-Port 8080]

param(
  [int]$Port = 8080
)

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host ""
Write-Host "Site-LCM local server"
Write-Host "Root: $Root"
Write-Host "URL:  http://127.0.0.1:$Port/"
Write-Host "Home: http://127.0.0.1:$Port/nva.nirmanavisual.com/pemogan/template-kit/home/"
Write-Host "Stop: Ctrl+C"
Write-Host ""

# Prefer Windows Python launcher, then python, then Node fallback
if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server $Port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $Port
} elseif (Get-Command node -ErrorAction SilentlyContinue) {
  node "$PSScriptRoot\serve.mjs" $Port
} else {
  Write-Error "Instale Python (py) ou Node.js para servir o site localmente."
  exit 1
}
