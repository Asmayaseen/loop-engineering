$resultFile = Join-Path $PSScriptRoot "output\result.json"

if (Test-Path $resultFile) {
    Write-Output "DONE"
} else {
    Write-Output "RUNNING"
}
