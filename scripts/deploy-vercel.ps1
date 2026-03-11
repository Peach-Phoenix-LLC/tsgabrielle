param(
  [ValidateSet("deploy", "verify", "envls", "link", "inspect", "go-live")]
  [string]$Mode = "deploy",
  [string]$Scope = "gabrielles-projects-451a3298",
  [string]$Deployment = "",
  [switch]$Prod
)

$ErrorActionPreference = "Stop"

function Run-Vercel {
  param([Parameter(Mandatory = $true)][string[]]$Args)
  $vercelCmd = Get-Command vercel -ErrorAction SilentlyContinue
  if ($null -ne $vercelCmd) {
    Write-Host "vercel $($Args -join ' ')" -ForegroundColor Cyan
    & vercel @Args
  } else {
    Write-Host "npx vercel $($Args -join ' ')" -ForegroundColor Cyan
    & npx vercel @Args
  }
}

switch ($Mode) {
  "link" {
    Run-Vercel -Args @("link", "--scope", $Scope)
    break
  }
  "envls" {
    Run-Vercel -Args @("env", "ls", "--scope", $Scope)
    break
  }
  "verify" {
    Run-Vercel -Args @("ls", "--scope", $Scope)
    break
  }
  "inspect" {
    if ([string]::IsNullOrWhiteSpace($Deployment)) {
      throw "Use -Deployment <deployment-url-or-id> with -Mode inspect"
    }
    Run-Vercel -Args @("inspect", $Deployment, "--scope", $Scope)
    break
  }
  "deploy" {
    if ($Prod) {
      Run-Vercel -Args @("--prod", "--scope", $Scope)
    } else {
      Run-Vercel -Args @("--scope", $Scope)
    }
    break
  }
  "go-live" {
    Run-Vercel -Args @("link", "--yes", "--scope", $Scope)
    Run-Vercel -Args @("env", "ls", "--scope", $Scope)
    Run-Vercel -Args @("--prod", "--scope", $Scope)
    Run-Vercel -Args @("ls", "--scope", $Scope)
    break
  }
  default {
    throw "Unknown mode: $Mode"
  }
}
