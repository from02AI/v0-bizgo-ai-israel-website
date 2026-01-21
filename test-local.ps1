$payload = Get-Content payload.json -Raw -Encoding UTF8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
$web = Invoke-WebRequest -Uri http://localhost:3000/api/generate-pdf -Method POST -ContentType "application/json" -Body $bytes -UseBasicParsing
[IO.File]::WriteAllBytes("test-local-fixed.pdf", $web.Content)
Write-Host "PDF generated: test-local-fixed.pdf ($($web.Content.Length) bytes)" -ForegroundColor Green
Start-Process "test-local-fixed.pdf"
