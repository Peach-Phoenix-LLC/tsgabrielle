$ErrorActionPreference='Continue'
$scope='tsg3'
$project='tsgabrielle-live'
$domains=@('tsgabrielle.us','www.tsgabrielle.us')
$log='vercel_domain_fix.log'
"" | Out-File $log

function Run($cmd){
  ">>> $cmd" | Tee-Object -FilePath $log -Append
  cmd /c $cmd 2>&1 | Tee-Object -FilePath $log -Append
}

Run "vercel whoami"
Run "vercel link --yes --project $project --scope $scope"

foreach($d in $domains){
  Run "vercel domains inspect $d"
}

# If you also have access to old owner scope, set it here to auto-remove:
$oldScope=''  # example: old-team-slug
if($oldScope){
  foreach($d in $domains){
    Run "vercel domains rm $d --scope $oldScope --yes"
  }
}

foreach($d in $domains){
  Run "vercel domains add $d --scope $scope"
}

Run "vercel --prod --scope $scope"
Run "vercel domains ls --scope $scope"

Write-Host "Done. Log saved to $log"
