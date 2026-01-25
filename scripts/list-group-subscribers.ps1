param([string]$groupId)
$envPath = ".env.local"
$keyLine = Get-Content $envPath | Where-Object { $_ -match '^\s*MAILERLITE_API_KEY\s*=' } | Select-Object -First 1
if (-not $keyLine) { Write-Error "MAILERLITE_API_KEY not found in $envPath"; exit 1 }
$key = $keyLine -replace '^\s*MAILERLITE_API_KEY\s*=\s*','' -replace '\s*#.*$',''
$key = $key.Trim()
if (-not $groupId) { Write-Error 'groupId parameter required'; exit 1 }

Try {
  $resp = Invoke-RestMethod -Uri "https://connect.mailerlite.com/api/groups/$groupId/subscribers" -Headers @{ Authorization = "Bearer $key" } -ErrorAction Stop
  $resp.data | Select-Object email,id | Format-Table
} Catch {
  Write-Error "Mailerlite API request failed: $_"
  exit 1
}
