# Test newsletter subscribe endpoint directly
# This verifies the Supabase + MailerLite sync works

$timestamp = Get-Date -Format "HHmmss"
$testEmail = "test-newsletter-$timestamp@bizgoai.co.il"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "NEWSLETTER SUBSCRIBE TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Test Email: $testEmail" -ForegroundColor Yellow

$body = @{
  email = $testEmail
  name = "Newsletter Test $timestamp"
  source = "manual-verification"
} | ConvertTo-Json

Write-Host "`nCalling /api/newsletter/subscribe..." -ForegroundColor Yellow

try {
  $resp = Invoke-RestMethod -Uri 'http://localhost:3000/api/newsletter/subscribe' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json' `
    -ErrorAction Stop
  
  Write-Host "`n✅ SUCCESS!" -ForegroundColor Green
  Write-Host "`nResponse:" -ForegroundColor White
  $resp | ConvertTo-Json -Depth 5 | Write-Host
  
  if ($resp.syncResult -and $resp.syncResult.ok) {
    Write-Host "`n✅✅ MAILERLITE SYNC CONFIRMED!" -ForegroundColor Green
    Write-Host "The subscriber was added to MailerLite group 177585329250764693" -ForegroundColor Green
  } elseif ($resp.subscriber) {
    Write-Host "`n✅ Supabase subscriber created" -ForegroundColor Green
    Write-Host "⚠️  MailerLite sync status: $($resp.syncResult | ConvertTo-Json -Compress)" -ForegroundColor Yellow
  }
  
  # Wait and check MailerLite
  Write-Host "`nWaiting 3 seconds then checking MailerLite..." -ForegroundColor Yellow
  Start-Sleep -Seconds 3
  
  $envPath = ".env.local"
  $keyLine = Get-Content $envPath | Where-Object { $_ -match '^\s*MAILERLITE_API_KEY\s*=' } | Select-Object -First 1
  $key = ($keyLine -replace '^\s*MAILERLITE_API_KEY\s*=\s*','').Trim()
  
  $groupLine = Get-Content $envPath | Where-Object { $_ -match '^\s*MAILERLITE_GROUP_ID\s*=' } | Select-Object -First 1
  $groupId = ($groupLine -replace '^\s*MAILERLITE_GROUP_ID\s*=\s*','').Trim()
  
  $mlResp = Invoke-RestMethod -Uri "https://connect.mailerlite.com/api/groups/$groupId/subscribers?limit=10" `
    -Headers @{ Authorization = "Bearer $key" }
  
  $found = $mlResp.data | Where-Object { $_.email -eq $testEmail }
  
  if ($found) {
    Write-Host "`n✅✅✅ VERIFIED IN MAILERLITE!" -ForegroundColor Green
    Write-Host "Email: $($found.email)" -ForegroundColor White
    Write-Host "Created: $($found.created_at)" -ForegroundColor White
  } else {
    Write-Host "`n⚠️  Not found in MailerLite yet (may take a moment)" -ForegroundColor Yellow
  }
  
} catch {
  Write-Host "`n❌ FAILED!" -ForegroundColor Red
  Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
  if ($_.ErrorDetails.Message) {
    Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
  }
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
