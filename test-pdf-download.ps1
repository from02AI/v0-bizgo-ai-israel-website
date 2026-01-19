# Test PDF Generation and Download
Write-Host "Testing PDF generation from standalone endpoint..." -ForegroundColor Cyan

try {
    # Generate PDF from standalone endpoint
    $response = Invoke-WebRequest -Uri "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf" -Method POST -UseBasicParsing
    
    # Save PDF to file
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $filename = "test-pdf-$timestamp.pdf"
    
    [System.IO.File]::WriteAllBytes($filename, $response.Content)
    
    Write-Host "`nPDF saved to: $filename" -ForegroundColor Green
    Write-Host "   Size: $($response.Content.Length) bytes" -ForegroundColor Gray
    
    # Get first 20 bytes as hex
    $firstBytes = $response.Content[0..19] | ForEach-Object { $_.ToString("X2") } | Join-String -Separator " "
    Write-Host "   First 20 bytes: $firstBytes" -ForegroundColor Gray
    
    # Compute SHA256 hash
    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    $hash = $sha256.ComputeHash($response.Content)
    $hashString = ($hash | ForEach-Object { $_.ToString("X2") }) -join ''
    Write-Host "   SHA256: $hashString" -ForegroundColor Yellow
    
    Write-Host "`n[EMAIL COMPARISON]" -ForegroundColor Cyan
    Write-Host "   1. Download the PDF attachment from Gmail" -ForegroundColor Gray
    Write-Host "   2. Compute its SHA256 hash" -ForegroundColor Gray
    Write-Host "   3. If hashes match -> encoding is perfect [OK]" -ForegroundColor Gray
    Write-Host "   4. If hashes differ -> corruption happened [FAIL]" -ForegroundColor Gray
    
    Write-Host "`nTo compute hash of downloaded email PDF:" -ForegroundColor Cyan
    Write-Host '   $sha = [System.Security.Cryptography.SHA256]::Create()' -ForegroundColor Gray
    Write-Host '   $bytes = [System.IO.File]::ReadAllBytes("path\to\downloaded.pdf")' -ForegroundColor Gray
    Write-Host '   $hash = $sha.ComputeHash($bytes)' -ForegroundColor Gray
    Write-Host '   ($hash | ForEach-Object { $_.ToString("X2") }) -join ""' -ForegroundColor Gray
    
} catch {
    Write-Host "`n[ERROR] $_" -ForegroundColor Red
}
