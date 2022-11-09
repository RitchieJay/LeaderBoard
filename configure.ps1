function Get-DotEnvConfiguration {
    param(
        [string] $Location = ".\.env"
    )

    $values = @{}
    $content = Get-Content $location -ErrorAction Stop
    foreach ($line in $content) {
        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }
        if ($line.StartsWith("#")) {
            continue
        }
        if ($line -like "*:=*") {
            $kvp = $line -split ":=", 2
            $key = $kvp[0].Trim()
            $value = "{0};{1}" -f $kvp[1].Trim(), [System.Environment]::GetEnvironmentVariable($key)
        }
        elseif ($line -like "*=:*") {
            $kvp = $line -split "=:", 2
            $key = $kvp[0].Trim()
            $value = "{1};{0}" -f $kvp[1].Trim(), [System.Environment]::GetEnvironmentVariable($key)
        }
        else {
            $kvp = $line -split "=", 2
            $key = $kvp[0].Trim()
            $value = $kvp[1].Trim()
        }

        $values.Add($key, $value.Trim('"'))
    }

    return $values
}

$configuration = Get-DotEnvConfiguration -Location "./.env"

Write-Output "Configuring HTTPS for Dev Server..."

$rootCertificate = (
    Get-ChildItem "Cert:\LocalMachine\Root" -Recurse
    | Where-Object { $_.Subject -eq "CN=Local Development Root CA" }
    | Select-Object -First 1
);

if (!$rootCertificate) {
    Write-Output "Creating Root CA Certificate..."

    $rootCertificateParams = @{
        DnsName           = "Local Development Root CA"
        KeyLength         = 4096
        KeyAlgorithm      = 'RSA'
        HashAlgorithm     = 'SHA256'
        KeyExportPolicy   = 'Exportable'
        NotAfter          = (Get-Date).AddYears(10)
        CertStoreLocation = 'Cert:\LocalMachine\My'
        KeyUsage          = 'CertSign', 'CRLSign'
    }

    $rootCertificate = New-SelfSignedCertificate @rootCertificateParams

    Write-Output "Adding new Root CA Certificate to Trusted Root CA..."

    $certificateStore = New-Object System.Security.Cryptography.X509Certificates.X509Store(
        [System.Security.Cryptography.X509Certificates.StoreName]::Root,
        "LocalMachine"
    )
    $certificateStore.Open("ReadWrite")
    $certificateStore.Add($rootCertificate)
    $certificateStore.Close()
}
else {
    Write-Output "Found existing Root CA Certificate ($($rootCertificate.Thumbprint))"
}

$projectCertificate = (
    Get-ChildItem "Cert:\LocalMachine\My" -Recurse
    | Where-Object { $_.Subject -eq "CN=$($configuration.APP_DOMAIN)" }
    | Select-Object -First 1
);

if (!$projectCertificate) {
    Write-Output "Creating Project Certificate..."

    $projectCertificateParams = @{
        DnsName           = $configuration.APP_DOMAIN
        Signer            = $rootCertificate
        KeyLength         = 4096
        KeyAlgorithm      = 'RSA'
        HashAlgorithm     = 'SHA256'
        KeyExportPolicy   = 'Exportable'
        NotAfter          = (Get-date).AddYears(10)
        CertStoreLocation = 'Cert:\LocalMachine\My'
    }

    $projectCertificate = New-SelfSignedCertificate @projectCertificateParams
}
else {
    Write-Output "Found existing Project Certificate ($($projectCertificate.Thumbprint))"
}

$outputPath = ".\certificates\development.pfx"
$certificatePassphrase = "local-development"
$certificatePassphrase = ConvertTo-SecureString -String $certificatePassphrase -Force -AsPlainText

Write-Output "Exporting Project Certificate..."
$exported = ($projectCertificate | Export-PfxCertificate -FilePath $outputPath -Password $certificatePassphrase)

if ($exported) {
    Write-Output "Exported Project Certificate ($($projectCertificate.Thumbprint)) to '$($outputPath)'."
}

Write-Output "Project configuration completed."