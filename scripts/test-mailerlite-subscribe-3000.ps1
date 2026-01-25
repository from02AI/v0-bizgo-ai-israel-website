$body = @{
  email = "test+mailerlite+auto2@example.com"
  name = "Auto Test 2"
  consent_source = "auto-run"
} | ConvertTo-Json

Try {
  $resp = Invoke-RestMethod -Uri 'http://localhost:3000/api/newsletter/subscribe' -Method Post -ContentType 'application/json' -Body $body -ErrorAction Stop
  $resp | ConvertTo-Json -Depth 5 | Write-Output
} Catch {
  Write-Error "Request failed: $_"
  exit 1
}
