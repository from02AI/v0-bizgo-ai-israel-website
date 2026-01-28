# MailerLite Integration - Complete Test Suite
# This script tests all 3 working "join the community" checkboxes
# and verifies they correctly sync to MailerLite

Write-Output "`n=========================================="
Write-Output "MAILERLITE INTEGRATION TEST SUITE"
Write-Output "=========================================="
Write-Output "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Output ""

# Load environment variables
$envPath = ".env.local"
if (-not (Test-Path $envPath)) {
  Write-Error ".env.local file not found. Tests cannot proceed."
  exit 1
}

Write-Output "✅ Found .env.local"

# Extract MailerLite credentials
$keyLine = Get-Content $envPath | Where-Object { $_ -match '^\s*MAILERLITE_API_KEY\s*=' } | Select-Object -First 1
$groupLine = Get-Content $envPath | Where-Object { $_ -match '^\s*MAILERLITE_GROUP_ID\s*=' } | Select-Object -First 1

if (-not $keyLine -or -not $groupLine) {
  Write-Error "MAILERLITE_API_KEY or MAILERLITE_GROUP_ID not found in .env.local"
  exit 1
}

$MAILERLITE_KEY = ($keyLine -replace '^\s*MAILERLITE_API_KEY\s*=\s*','').Trim()
$MAILERLITE_GROUP = ($groupLine -replace '^\s*MAILERLITE_GROUP_ID\s*=\s*','').Trim()

Write-Output "✅ MailerLite API Key: $($MAILERLITE_KEY.Substring(0,10))..."
Write-Output "✅ MailerLite Group ID: $MAILERLITE_GROUP"
Write-Output ""

# Check if local server is running
Write-Output "Checking local development server..."
try {
  $ping = Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 3 -UseBasicParsing
  Write-Output "✅ Local server is running on http://localhost:3000"
} catch {
  Write-Warning "❌ Local server is NOT running"
  Write-Output "Please start the server with: npm run dev"
  Write-Output "Then run this test again."
  exit 1
}

Write-Output ""
Write-Output "=========================================="
Write-Output "STARTING TESTS"
Write-Output "=========================================="
Write-Output ""

$timestamp = Get-Date -Format "HHmmss"
$testResults = @()

# ============================================
# TEST 1: Contact Form Checkbox
# ============================================
Write-Output "`n>>> TEST 1: Contact Form Checkbox"
Write-Output "------------------------------------------"

$email1 = "test-contact-$timestamp@bizgoai.co.il"
$body1 = @{
  name = "Contact Test $timestamp"
  email = $email1
  phone = "052-1234567"
  message = "Testing contact form MailerLite integration - automated test"
  subscribeCommunity = $true
} | ConvertTo-Json

Write-Output "Submitting contact form..."
Write-Output "Email: $email1"

try {
  $resp1 = Invoke-RestMethod -Uri 'http://localhost:3000/api/contact' -Method Post -ContentType 'application/json' -Body $body1 -ErrorAction Stop
  Write-Output "✅ Form submitted successfully"
  
  # Wait for async newsletter subscribe
  Start-Sleep -Seconds 2
  
  # Check Supabase
  Write-Output "Checking Supabase for subscriber..."
  $supabaseUrl = (Get-Content $envPath | Where-Object { $_ -match '^\s*SUPABASE_URL\s*=' } | Select-Object -First 1) -replace '^\s*SUPABASE_URL\s*=\s*',''
  $supabaseKey = (Get-Content $envPath | Where-Object { $_ -match '^\s*SUPABASE_SERVICE_KEY\s*=' } | Select-Object -First 1) -replace '^\s*SUPABASE_SERVICE_KEY\s*=\s*',''
  $supabaseUrl = $supabaseUrl.Trim()
  $supabaseKey = $supabaseKey.Trim()
  
  $encoded = [System.Uri]::EscapeDataString($email1)
  $uri = "$supabaseUrl/rest/v1/subscribers?select=*,provider_ids&email=eq.$encoded"
  
  $subResp = Invoke-RestMethod -Uri $uri -Headers @{ Authorization = "Bearer $supabaseKey"; apikey = $supabaseKey }
  
  if ($subResp -and $subResp.Count -gt 0) {
    Write-Output "✅ Subscriber found in Supabase"
    $mailerliteId = $subResp[0].provider_ids.mailerlite
    if ($mailerliteId) {
      Write-Output "✅ MailerLite ID present: $mailerliteId"
      $testResults += @{ Test = "Contact Form"; Status = "PASS"; Email = $email1 }
    } else {
      Write-Warning "⚠️  MailerLite ID missing from Supabase record"
      $testResults += @{ Test = "Contact Form"; Status = "PARTIAL"; Email = $email1 }
    }
  } else {
    Write-Warning "❌ Subscriber NOT found in Supabase"
    $testResults += @{ Test = "Contact Form"; Status = "FAIL"; Email = $email1 }
  }
  
} catch {
  Write-Error "❌ Contact form test failed: $_"
  $testResults += @{ Test = "Contact Form"; Status = "ERROR"; Email = $email1 }
}

# ============================================
# TEST 2: Consultation Form Checkbox
# ============================================
Write-Output "`n>>> TEST 2: Consultation Form Checkbox"
Write-Output "------------------------------------------"

$email2 = "test-consultation-$timestamp@bizgoai.co.il"
$body2 = @{
  fullName = "Consultation Test $timestamp"
  email = $email2
  phone = "052-7654321"
  businessName = "Test Business Ltd"
  sector = "Technology"
  mainProduct = "Software"
  businessSize = "1-5"
  selectedProcess = "Sales"
  weeklyTimeSpent = "1-5"
  aiMistakeImpact = "Low"
  aiExperience = "Beginner"
  mainLimitation = "Budget"
  goal = "Automation"
  currentTools = @("Excel")
  isDecisionMaker = $true
  canCommitToTrial = $true
  subscribeCommunity = $true
} | ConvertTo-Json

Write-Output "Submitting consultation form..."
Write-Output "Email: $email2"

try {
  $resp2 = Invoke-RestMethod -Uri 'http://localhost:3000/api/consultation' -Method Post -ContentType 'application/json' -Body $body2 -ErrorAction Stop
  Write-Output "✅ Form submitted successfully"
  
  # Wait for sync
  Start-Sleep -Seconds 2
  
  # Check Supabase
  Write-Output "Checking Supabase for subscriber..."
  $encoded = [System.Uri]::EscapeDataString($email2)
  $uri = "$supabaseUrl/rest/v1/subscribers?select=*,provider_ids&email=eq.$encoded"
  
  $subResp = Invoke-RestMethod -Uri $uri -Headers @{ Authorization = "Bearer $supabaseKey"; apikey = $supabaseKey }
  
  if ($subResp -and $subResp.Count -gt 0) {
    Write-Output "✅ Subscriber found in Supabase"
    $mailerliteId = $subResp[0].provider_ids.mailerlite
    if ($mailerliteId) {
      Write-Output "✅ MailerLite ID present: $mailerliteId"
      $testResults += @{ Test = "Consultation Form"; Status = "PASS"; Email = $email2 }
    } else {
      Write-Warning "⚠️  MailerLite ID missing from Supabase record"
      $testResults += @{ Test = "Consultation Form"; Status = "PARTIAL"; Email = $email2 }
    }
  } else {
    Write-Warning "❌ Subscriber NOT found in Supabase"
    $testResults += @{ Test = "Consultation Form"; Status = "FAIL"; Email = $email2 }
  }
  
} catch {
  Write-Error "❌ Consultation form test failed: $_"
  $testResults += @{ Test = "Consultation Form"; Status = "ERROR"; Email = $email2 }
}

# ============================================
# TEST 3: Newsletter Subscribe Direct
# ============================================
Write-Output "`n>>> TEST 3: Newsletter Subscribe Endpoint (Direct)"
Write-Output "------------------------------------------"

$email3 = "test-newsletter-$timestamp@bizgoai.co.il"
$body3 = @{
  email = $email3
  name = "Newsletter Test $timestamp"
  source = "automated-test"
  subscribeCommunity = $true
} | ConvertTo-Json

Write-Output "Calling /api/newsletter/subscribe..."
Write-Output "Email: $email3"

try {
  $resp3 = Invoke-RestMethod -Uri 'http://localhost:3000/api/newsletter/subscribe' -Method Post -ContentType 'application/json' -Body $body3 -ErrorAction Stop
  Write-Output "✅ Newsletter subscribe succeeded"
  
  if ($resp3.syncResult -and $resp3.syncResult.ok) {
    Write-Output "✅ MailerLite sync confirmed in response"
    $testResults += @{ Test = "Newsletter Direct"; Status = "PASS"; Email = $email3 }
  } elseif ($resp3.subscriber) {
    Write-Output "✅ Subscriber created in Supabase"
    Write-Warning "⚠️  MailerLite sync status unknown from response"
    $testResults += @{ Test = "Newsletter Direct"; Status = "PARTIAL"; Email = $email3 }
  } else {
    Write-Warning "❌ Unexpected response format"
    $testResults += @{ Test = "Newsletter Direct"; Status = "FAIL"; Email = $email3 }
  }
  
} catch {
  Write-Error "❌ Newsletter subscribe test failed: $_"
  $testResults += @{ Test = "Newsletter Direct"; Status = "ERROR"; Email = $email3 }
}

# ============================================
# VERIFY IN MAILERLITE
# ============================================
Write-Output "`n>>> VERIFYING IN MAILERLITE GROUP"
Write-Output "------------------------------------------"

Write-Output "Fetching subscribers from group $MAILERLITE_GROUP..."

try {
  $mlResp = Invoke-RestMethod -Uri "https://connect.mailerlite.com/api/groups/$MAILERLITE_GROUP/subscribers?limit=20" -Headers @{ Authorization = "Bearer $MAILERLITE_KEY" }
  
  Write-Output "✅ Successfully connected to MailerLite API"
  Write-Output "Total subscribers in group: $($mlResp.data.Count)"
  Write-Output ""
  Write-Output "Recent subscribers (last 10):"
  $mlResp.data | Select-Object -First 10 email, @{Name='created';Expression={[datetime]::Parse($_.created_at).ToString('yyyy-MM-dd HH:mm:ss')}} | Format-Table -AutoSize
  
  # Check for our test emails
  $foundEmails = @()
  foreach ($testEmail in @($email1, $email2, $email3)) {
    $found = $mlResp.data | Where-Object { $_.email -eq $testEmail }
    if ($found) {
      Write-Output "✅ Found test email in MailerLite: $testEmail"
      $foundEmails += $testEmail
    } else {
      Write-Warning "⚠️  Test email NOT found in MailerLite (may take a moment): $testEmail"
    }
  }
  
} catch {
  Write-Error "❌ Failed to fetch MailerLite subscribers: $_"
}

# ============================================
# TEST RESULTS SUMMARY
# ============================================
Write-Output "`n=========================================="
Write-Output "TEST RESULTS SUMMARY"
Write-Output "=========================================="

$testResults | ForEach-Object {
  $status = switch ($_.Status) {
    "PASS" { "✅ PASS" }
    "PARTIAL" { "⚠️  PARTIAL" }
    "FAIL" { "❌ FAIL" }
    "ERROR" { "❌ ERROR" }
  }
  Write-Output "$status - $($_.Test) - $($_.Email)"
}

$passCount = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$totalCount = $testResults.Count

Write-Output ""
Write-Output "OVERALL: $passCount / $totalCount tests passed"

if ($passCount -eq $totalCount) {
  Write-Output ""
  Write-Output "🎉 ALL TESTS PASSED! MailerLite integration is working 100%"
} else {
  Write-Output ""
  Write-Warning "⚠️  Some tests did not pass. Review the output above for details."
}

Write-Output ""
Write-Output "=========================================="
Write-Output "TEST SUITE COMPLETE"
Write-Output "=========================================="
Write-Output ""
