# PowerShell script to move remaining app directories into (storefront) and clean up imports

$srcRoot = "src\app"
$destRoot = "src\app\(storefront)"

# Get all top-level directories in src\app except (storefront) and files
$dirs = Get-ChildItem -Path $srcRoot -Directory | Where-Object { $_.Name -notmatch "^\(storefront\)$" }

foreach ($dir in $dirs) {
    $target = Join-Path $destRoot $dir.Name
    Write-Host "Moving $($dir.FullName) -> $target"
    Move-Item -Path $dir.FullName -Destination $target -Force
}

# Now clean up imports and JSX components in all page.tsx files under (storefront)
$tsxFiles = Get-ChildItem -Path $destRoot -Recurse -Filter "page.tsx" -File
foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    # Remove ModernNavbar and ModernFooter imports
    $content = $content -replace "import ModernNavbar from '@/components/Home/ModernNavbar';\r?\n", ""
    $content = $content -replace "import ModernFooter from '@/components/Home/ModernFooter';\r?\n", ""
    # Remove JSX tags
    $content = $content -replace "<ModernNavbar\s*/?>", ""
    $content = $content -replace "<ModernFooter\s*/?>", ""
    # Ensure background is white (replace bg-[#050406] or bg-black etc.)
    $content = $content -replace "bg-\[#[0-9a-fA-F]{6}\]", "bg-white"
    $content = $content -replace "bg-black", "bg-white"
    # Add SEO metadata if missing (simple check)
    if (-not ($content -match "export const metadata")) {
        $metadata = "export const metadata = {\n    title: 'Page Title',\n    description: 'Page description.'\n};\n\n"
        $content = $metadata + $content
    }
    Set-Content -Path $file.FullName -Value $content -Force
    Write-Host "Updated $($file.FullName)"
}

Write-Host "All done."
