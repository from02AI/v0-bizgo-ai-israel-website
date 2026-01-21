$payload = Get-Content payload.json -Raw -Encoding UTF8
$uri = "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf"

Write-Host "Testing production PDF with icon fix..." -ForegroundColor Cyan

try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $response = Invoke-WebRequest -Uri $uri -Method POST -ContentType "application/json" -Body $bytes -UseBasicParsing
    
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $filename = "bizgo-ai-report-FIXED-$timestamp.pdf"
    
    [System.IO.File]::WriteAllBytes($filename, $response.Content)
    
    Write-Host "[OK] PDF saved: $filename" -ForegroundColor Green
    Write-Host "Size: $((Get-Item $filename).Length) bytes" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Opening PDF to verify icon fix..." -ForegroundColor Yellow
    
    Start-Process $filename
    
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}
