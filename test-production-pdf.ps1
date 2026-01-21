# Simple test - Generate PDF from production
$payload = Get-Content "payload.json" -Raw -Encoding UTF8
$uri = "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf"

Write-Host "Generating PDF from production..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $uri -Method POST -Body $payload -ContentType "application/json; charset=utf-8"
    
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $filename = "bizgo-ai-report-$timestamp.pdf"
    
    [System.IO.File]::WriteAllBytes($filename, $response)
    
    Write-Host "[OK] PDF saved: $filename" -ForegroundColor Green
    Write-Host "Size: $((Get-Item $filename).Length) bytes" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Open the PDF to check if icons are fixed!" -ForegroundColor Yellow
    
    # Auto-open PDF
    Start-Process $filename
    
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}
