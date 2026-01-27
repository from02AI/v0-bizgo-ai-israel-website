# Complete Simulator Email Flow Test
# This mimics the exact user experience: fill simulator -> generate PDF -> receive email

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BizGoAI Simulator - Complete Email Flow" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load simulator data
$payload = Get-Content payload.json -Raw -Encoding UTF8
$simulatorData = $payload | ConvertFrom-Json

Write-Host "Step 1: Simulator Data Summary" -ForegroundColor Yellow
Write-Host "  Task: $($simulatorData.tool1Data.taskName)" -ForegroundColor Gray
Write-Host "  Fit Score: $($simulatorData.tool1Data.score)/10 ($($simulatorData.tool1Data.fitLabel))" -ForegroundColor Gray
Write-Host "  Safety Score: $($simulatorData.tool2Data.safetyScore)/10 ($($simulatorData.tool2Data.safetyLabel))" -ForegroundColor Gray
Write-Host "  6-Month Savings: ₪$($simulatorData.tool3Data.sixMonthTotal)" -ForegroundColor Gray
Write-Host "  Break-Even: Month $($simulatorData.tool3Data.breakEvenMonth)" -ForegroundColor Gray
Write-Host ""

# Step 2: Generate PDF (as the system does)
Write-Host "Step 2: Generating PDF Report..." -ForegroundColor Yellow
try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $pdfResponse = Invoke-WebRequest -Uri "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf" -Method POST -ContentType "application/json" -Body $bytes -UseBasicParsing
    
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $localPdfFile = "simulator-report-$timestamp.pdf"
    [System.IO.File]::WriteAllBytes($localPdfFile, $pdfResponse.Content)
    
    Write-Host "[OK] PDF Generated: $localPdfFile" -ForegroundColor Green
    Write-Host "  Size: $($pdfResponse.Content.Length) bytes" -ForegroundColor Gray
    Write-Host ""
    
    # Convert to base64 for email
    $pdfBase64 = [Convert]::ToBase64String($pdfResponse.Content)
    
} catch {
    Write-Host "[ERROR] Failed to generate PDF: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Send Email (as the system does)
Write-Host "Step 3: Sending Email to shanniecarmi@gmail.com..." -ForegroundColor Yellow

try {
    # Prepare email data exactly as the system does
    $emailPayload = @{
        email = "shanniecarmi@gmail.com"
        pdfBase64 = $pdfBase64
        reportData = @{
            taskName = $simulatorData.tool1Data.taskName
            fitScore = $simulatorData.tool1Data.score
            fitLabel = $simulatorData.tool1Data.fitLabel
            safetyScore = $simulatorData.tool2Data.safetyScore
            safetyLabel = $simulatorData.tool2Data.safetyLabel
            totalSixMonthSavings = $simulatorData.tool3Data.sixMonthTotal
            breakEvenMonth = $simulatorData.tool3Data.breakEvenMonth
        }
    } | ConvertTo-Json -Depth 10
    
    $emailBytes = [System.Text.Encoding]::UTF8.GetBytes($emailPayload)
    $emailResponse = Invoke-WebRequest -Uri "https://v0-bizgo-ai-israel-website.vercel.app/api/send-report" -Method POST -ContentType "application/json" -Body $emailBytes -UseBasicParsing
    
    [void]($emailResponse.Content | ConvertFrom-Json)
    
    Write-Host "[OK] Email Sent Successfully!" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "[ERROR] Failed to send email: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    exit 1
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "COMPLETE SIMULATOR FLOW TEST - SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What was sent:" -ForegroundColor Yellow
Write-Host "  ✓ Complete simulator data from all 3 tools" -ForegroundColor Green
Write-Host "  ✓ Professional PDF report with emoji icons" -ForegroundColor Green
Write-Host "  ✓ Personalized email with summary and PDF attachment" -ForegroundColor Green
Write-Host ""
Write-Host "Email sent to: shanniecarmi@gmail.com" -ForegroundColor Cyan
Write-Host "Local PDF copy: $localPdfFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please check your email inbox!" -ForegroundColor Yellow
Write-Host "The PDF should have colored emoji circles for scores" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opening local PDF for verification..." -ForegroundColor Yellow
Start-Process $localPdfFile
