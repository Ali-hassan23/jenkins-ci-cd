pipeline {
  agent any

  environment {
    PLAYWRIGHT_REPORT = 'playwright-report'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare Agent') {
      steps {
        // Ensure pnpm is available (install globally if missing)
        bat 'where pnpm || npm i -g pnpm'
        bat 'node -v'
        bat 'pnpm -v'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'pnpm install --frozen-lockfile'
      }
    }

    stage('Build Application') {
      steps {
        bat 'pnpm run build'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        // Install required browsers for Playwright tests on Windows
        bat 'pnpm exec playwright install --with-deps'
      }
    }

    stage('Start App') {
      steps {
        // Start the production server in background
        bat 'start /B pnpm run start > server.log 2>&1'

        // Wait up to 30s for http://localhost:3000 to respond
        bat 'powershell -Command "$url=\'http://localhost:3000\'; for ($i=0;$i -lt 30;$i++){ try{ $r=Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop; if ($r.StatusCode -eq 200){ exit 0 } } catch{} Start-Sleep -s 1 }; exit 1"'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        // Generate HTML and JUnit reports for archiving
        bat 'pnpm exec playwright test --reporter=html,junit'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: "${PLAYWRIGHT_REPORT}/**", allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: '**/junit-report-*.xml,**/test-results/**/*.xml'
    }
  }
}
