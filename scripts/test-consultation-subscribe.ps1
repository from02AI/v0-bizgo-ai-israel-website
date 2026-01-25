$body = @{
  fullName = "Consult Test"
  email = "consultation-test+mailerlite@example.com"
  phone = "052-0000000"
  businessName = "Test Business"
  sector = "Retail"
  mainProduct = "Product"
  businessSize = "1-5"
  selectedProcess = "Sales"
  weeklyTimeSpent = "1-5"
  aiMistakeImpact = "Low"
  aiExperience = "Beginner"
  mainLimitation = "None"
  goal = "Test"
  currentTools = @("ToolA")
  isDecisionMaker = $true
  canCommitToTrial = $true
  subscribeCommunity = $true
} | ConvertTo-Json

Try {
  $resp = Invoke-RestMethod -Uri 'http://localhost:3000/api/consultation' -Method Post -ContentType 'application/json' -Body $body -ErrorAction Stop
  $resp | ConvertTo-Json -Depth 5 | Write-Output
} Catch {
  Write-Error "Request failed: $_"
  exit 1
}
