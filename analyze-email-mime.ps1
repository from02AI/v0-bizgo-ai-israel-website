# Email MIME Analysis Tool
# Use this to analyze raw email source if PDFs are still corrupted

Write-Host "=== Email MIME Analysis Tool ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "How to get raw email source:" -ForegroundColor Yellow
Write-Host "  1. Open email in Gmail" -ForegroundColor Gray
Write-Host "  2. Click three dots menu (⋮)" -ForegroundColor Gray
Write-Host "  3. Select 'Show original'" -ForegroundColor Gray
Write-Host "  4. Copy entire content to a file (e.g., email-raw.txt)" -ForegroundColor Gray
Write-Host ""
Write-Host "This tool will extract and verify the PDF attachment from raw email source." -ForegroundColor Gray
Write-Host ""

$rawEmailPath = Read-Host "Enter path to raw email file (or press Enter to skip)"

if ([string]::IsNullOrWhiteSpace($rawEmailPath)) {
    Write-Host ""
    Write-Host "Skipped. When ready, run this again with the raw email file." -ForegroundColor Yellow
    exit
}

if (-not (Test-Path $rawEmailPath)) {
    Write-Host ""
    Write-Host "[ERROR] File not found: $rawEmailPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Reading email source..." -ForegroundColor Cyan

$content = Get-Content $rawEmailPath -Raw

# Find Content-Transfer-Encoding for PDF attachment
if ($content -match 'Content-Type:\s*application/pdf[^\r\n]*[\r\n]+Content-Transfer-Encoding:\s*([^\r\n]+)') {
    $encoding = $matches[1].Trim()
    Write-Host ""
    Write-Host "[FOUND] Content-Transfer-Encoding: $encoding" -ForegroundColor $(if ($encoding -eq 'base64') { 'Green' } else { 'Red' })
    
    if ($encoding -ne 'base64') {
        Write-Host ""
        Write-Host "[PROBLEM] PDF should use 'base64' encoding, but found: $encoding" -ForegroundColor Red
        Write-Host "This is likely the cause of corruption!" -ForegroundColor Yellow
    } else {
        Write-Host "[OK] Correct encoding detected" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "[WARNING] Could not find Content-Transfer-Encoding header for PDF" -ForegroundColor Yellow
}

# Try to extract base64 PDF data
if ($content -match 'Content-Type:\s*application/pdf.*?[\r\n]+((?:[A-Za-z0-9+/=]{4,}\r?\n?)+)') {
    $base64Data = $matches[1] -replace '[\r\n]', ''
    
    Write-Host ""
    Write-Host "[FOUND] PDF base64 data" -ForegroundColor Green
    Write-Host "  Length: $($base64Data.Length) characters" -ForegroundColor Gray
    Write-Host "  First 50: $($base64Data.Substring(0, [Math]::Min(50, $base64Data.Length)))" -ForegroundColor Gray
    Write-Host "  Last 50: $($base64Data.Substring([Math]::Max(0, $base64Data.Length - 50)))" -ForegroundColor Gray
    
    # Ask if user wants to decode and save
    Write-Host ""
    $save = Read-Host "Extract and save PDF? (y/n)"
    
    if ($save -eq 'y' -or $save -eq 'Y') {
        try {
            $pdfBytes = [System.Convert]::FromBase64String($base64Data)
            $outputPath = "extracted-pdf-$(Get-Date -Format 'yyyyMMdd_HHmmss').pdf"
            [System.IO.File]::WriteAllBytes($outputPath, $pdfBytes)
            
            Write-Host ""
            Write-Host "[SUCCESS] PDF extracted to: $outputPath" -ForegroundColor Green
            Write-Host "  Size: $($pdfBytes.Length) bytes" -ForegroundColor Gray
            
            # Check PDF magic bytes
            $magicBytes = ($pdfBytes[0..3] | ForEach-Object { [char]$_ }) -join ''
            Write-Host "  Magic bytes: $magicBytes" -ForegroundColor Gray
            
            if ($magicBytes -like '%PDF*') {
                Write-Host "  [OK] Valid PDF header detected" -ForegroundColor Green
                Write-Host ""
                Write-Host "Try opening this extracted PDF to verify it's not corrupted." -ForegroundColor Cyan
            } else {
                Write-Host "  [ERROR] Invalid PDF header - file is corrupted!" -ForegroundColor Red
            }
            
            # Compute hash
            $sha256 = [System.Security.Cryptography.SHA256]::Create()
            $hash = $sha256.ComputeHash($pdfBytes)
            $hashString = ($hash | ForEach-Object { $_.ToString("X2") }) -join ''
            Write-Host "  SHA256: $hashString" -ForegroundColor Yellow
            
        } catch {
            Write-Host ""
            Write-Host "[ERROR] Failed to decode base64: $_" -ForegroundColor Red
        }
    }
} else {
    Write-Host ""
    Write-Host "[ERROR] Could not extract PDF base64 data from email" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Analysis Complete ===" -ForegroundColor Cyan
