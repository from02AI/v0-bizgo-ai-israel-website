# Complete Simulator Email Flow Test
# Mimics real user flow: simulator -> PDF -> email

Write-Host "========================================"
Write-Host "BizgoAI Simulator - Complete Email Flow"
Write-Host "========================================"
Write-Host ""

$payload = Get-Content payload.json -Raw -Encoding UTF8
$simulatorData = $payload | ConvertFrom-Json

Write-Host "Step 1: Simulator Data Summary"
Write-Host "  Task: $($simulatorData.tool1Data.taskName)"
Write-Host "  Fit Score: $($simulatorData.tool1Data.score)/10"
Write-Host "  Safety Score: $($simulatorData.tool2Data.safetyScore)/10"
Write-Host "  Savings: $($simulatorData.tool3Data.sixMonthTotal) NIS"
Write-Host ""

Write-Host "Step 2: Generating PDF Report..."
try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $pdfResponse = Invoke-WebRequest -Uri "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf" -Method POST -ContentType "application/json" -Body $bytes -UseBasicParsing
    
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $localPdfFile = "simulator-report-$timestamp.pdf"
    [System.IO.File]::WriteAllBytes($localPdfFile, $pdfResponse.Content)
    
    Write-Host "[OK] PDF Generated: $localPdfFile"
    Write-Host "  Size: $($pdfResponse.Content.Length) bytes"
    Write-Host ""
    
    $pdfBase64 = [Convert]::ToBase64String($pdfResponse.Content)
    
} catch {
    Write-Host "[ERROR] Failed to generate PDF: $($_.Exception.Message)"
    exit 1
}

Write-Host "Step 3: Sending Email to shanniecarmi@gmail.com..."

try {
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
    
    Write-Host "[OK] Email Sent Successfully!"
    Write-Host ""
    
} catch {
    Write-Host "[ERROR] Failed to send email: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
    }
    exit 1
}

Write-Host "========================================"
Write-Host "COMPLETE SIMULATOR FLOW - SUCCESS!"
Write-Host "========================================"
Write-Host ""
Write-Host "Email sent to: shanniecarmi@gmail.com"
Write-Host "Local PDF copy: $localPdfFile"
Write-Host ""
Write-Host "Check your email for:"
Write-Host "  - Personalized email with data summary"
Write-Host "  - PDF attachment with emoji circle icons"
Write-Host ""
Write-Host "Opening local PDF..."
Start-Process $localPdfFile
