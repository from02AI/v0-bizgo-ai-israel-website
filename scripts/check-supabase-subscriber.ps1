param([string]$email)
$envPath = ".env.local"
$lineUrl = Get-Content $envPath | Where-Object { $_ -match '^\s*SUPABASE_URL\s*=' } | Select-Object -First 1
$lineKey = Get-Content $envPath | Where-Object { $_ -match '^\s*SUPABASE_SERVICE_KEY\s*=' } | Select-Object -First 1
if (-not $lineUrl -or -not $lineKey) { Write-Error ".env.local must contain SUPABASE_URL and SUPABASE_SERVICE_KEY"; exit 1 }
$SUPABASE_URL = ($lineUrl -replace '^\s*SUPABASE_URL\s*=\s*','').Trim()
$SUPABASE_KEY = ($lineKey -replace '^\s*SUPABASE_SERVICE_KEY\s*=\s*','').Trim()
$SUPABASE_URL = $SUPABASE_URL.Trim()
$SUPABASE_KEY = $SUPABASE_KEY.Trim()
if (-not $email) { Write-Error 'email parameter required'; exit 1 }

$encoded = [System.Web.HttpUtility]::UrlEncode($email)
$uri = "$SUPABASE_URL/rest/v1/subscribers?select=*,provider_ids&email=eq.$encoded"

Try {
  $resp = Invoke-RestMethod -Uri $uri -Headers @{ Authorization = "Bearer $SUPABASE_KEY"; apikey = $SUPABASE_KEY } -ErrorAction Stop
  if ($resp -and $resp.Count -gt 0) {
    $resp | ConvertTo-Json -Depth 5 | Write-Output
  } else {
    Write-Output "No matching subscriber found for $email"
  }
} Catch {
  Write-Error "Supabase request failed: $_"
  exit 1
}
