$payload = Get-Content payload.json -Raw -Encoding UTF8
$uri = "https://v0-bizgo-ai-israel-website.vercel.app/api/generate-pdf"

Write-Host "Generating PDF and sending to shanniecarmi@gmail.com..." -ForegroundColor Cyan

try {
    # Step 1: Generate PDF
    Write-Host "Step 1: Generating PDF..." -ForegroundColor Yellow
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $response = Invoke-WebRequest -Uri $uri -Method POST -ContentType "application/json" -Body $bytes -UseBasicParsing
    
    Write-Host "[OK] PDF generated: $($response.Content.Length) bytes" -ForegroundColor Green
    
    # Step 2: Convert to base64
    $base64PDF = [Convert]::ToBase64String($response.Content)
    
    # Step 3: Load payload data
    $payloadData = $payload | ConvertFrom-Json
    
    # Step 4: Send email
    Write-Host "Step 2: Sending email..." -ForegroundColor Yellow
    
    $emailPayload = @{
        email = "shanniecarmi@gmail.com"
        pdfBase64 = $base64PDF
        reportData = @{
            taskName = $payloadData.tool1Data.taskName
            fitScore = $payloadData.tool1Data.score
            fitLabel = $payloadData.tool1Data.fitLabel
            safetyScore = $payloadData.tool2Data.safetyScore
            safetyLabel = $payloadData.tool2Data.safetyLabel
            totalSixMonthSavings = $payloadData.tool3Data.sixMonthTotal
            breakEvenMonth = $payloadData.tool3Data.breakEvenMonth
        }
    } | ConvertTo-Json -Depth 10
    
    $emailBytes = [System.Text.Encoding]::UTF8.GetBytes($emailPayload)
    $emailResponse = Invoke-WebRequest -Uri "https://v0-bizgo-ai-israel-website.vercel.app/api/send-report" -Method POST -ContentType "application/json" -Body $emailBytes -UseBasicParsing
    
    Write-Host "[OK] Email sent successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "EMAIL SENT TO: shanniecarmi@gmail.com" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please check the email and PDF attachment." -ForegroundColor Yellow
    Write-Host "The icons should now appear as colored circles:" -ForegroundColor Yellow
    Write-Host "  - Green circles for high scores (8-10)" -ForegroundColor Green
    Write-Host "  - Orange circles for medium scores (6-7)" -ForegroundColor Yellow
    Write-Host "  - Red circles for low scores (0-5)" -ForegroundColor Red
    
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
}
