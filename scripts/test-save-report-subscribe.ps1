$body = @{
  user_email = "simulator-test+mailerlite@example.com"
  subscribeCommunity = $true
  tool1Data = @{ taskName = 'Test Task'; score = 42; q1=1; q2=2; q3=3; q4=4 }
} | ConvertTo-Json

Try {
  $resp = Invoke-RestMethod -Uri 'http://localhost:3000/api/save-report' -Method Post -ContentType 'application/json' -Body $body -ErrorAction Stop
  $resp | ConvertTo-Json -Depth 5 | Write-Output
} Catch {
  Write-Error "Request failed: $_"
  exit 1
}
