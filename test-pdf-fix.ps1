# Test PDF Fix - Generate and Send Email
Write-Host "Testing PDF icon fix..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Generate PDF locally
Write-Host "Step 1: Generating PDF with test data..." -ForegroundColor Yellow
try {
    $payload = Get-Content "payload.json" -Raw -Encoding UTF8
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/generate-pdf" `
        -Method POST `
        -ContentType "application/json; charset=utf-8" `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($payload)) `
        -UseBasicParsing
    
    # Save PDF to file
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $filename = "bizgo-ai-report-$timestamp.pdf"
    
    [System.IO.File]::WriteAllBytes($filename, $response.Content)
    
    Write-Host "[OK] PDF saved to: $filename" -ForegroundColor Green
    Write-Host "  Size: $($response.Content.Length) bytes" -ForegroundColor Gray
    
    # Convert to base64 for email
    $base64PDF = [Convert]::ToBase64String($response.Content)
    
    Write-Host ""
    Write-Host "Step 2: Sending email to shanniecarmi@gmail.com..." -ForegroundColor Yellow
    
    # Load payload data to extract taskName
    $payloadData = $payload | ConvertFrom-Json
    $taskName = $payloadData.tool1Data.taskName
    
    # Prepare email payload
    $emailPayload = @{
        email = "shanniecarmi@gmail.com"
        pdfBase64 = $base64PDF
        reportData = @{
            taskName = $taskName
            fitScore = $payloadData.tool1Data.score
            fitLabel = $payloadData.tool1Data.fitLabel
            safetyScore = $payloadData.tool2Data.safetyScore
            safetyLabel = $payloadData.tool2Data.safetyLabel
            totalSixMonthSavings = $payloadData.tool3Data.sixMonthTotal
            breakEvenMonth = $payloadData.tool3Data.breakEvenMonth
        }
    } | ConvertTo-Json -Depth 10
    
    $emailResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/send-report" `
        -Method POST `
        -ContentType "application/json; charset=utf-8" `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($emailPayload)) `
        -UseBasicParsing
    
    [void]($emailResponse.Content | ConvertFrom-Json)
    
    Write-Host "[OK] Email sent successfully!" -ForegroundColor Green
    Write-Host "  Response: $($emailResponse.Content)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "CHECK YOUR EMAIL: shanniecarmi@gmail.com" -ForegroundColor Cyan
    Write-Host "The icons should now be colored circles instead of clipboard symbols" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Local PDF saved as: $filename" -ForegroundColor Cyan
    
} catch {
    Write-Host "[ERROR] $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure the dev server is running: npm run dev" -ForegroundColor Yellow
}
