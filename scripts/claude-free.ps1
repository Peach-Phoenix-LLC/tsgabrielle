# Claude-Free Replacement Script
# Uses your Oracle Cloud Llama 3 Vision Brain
param(
    [Parameter(Position=0)]
    [string]$Message
)

if (-not $Message) {
    Write-Host "🦞 Claude-Free (Llama 3 Powered)" -ForegroundColor Magenta
    Write-Host "Usage: claude-free 'your message here'"
    exit
}

openclaw agent --agent main --message $Message
