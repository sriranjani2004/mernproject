pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.18.1'
    }

    environment {
        NODEJS_HOME = '/usr/local/bin/node'
        PATH = "${env.NODEJS_HOME}/bin:/usr/local/bin:${env.PATH}"  // Ensure Node.js and Sonar Scanner are in the PATH
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install and Build') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }

        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')  // Inject SonarQube token from Jenkins credentials
            }
            steps {
                script {
                    // Check if sonar-scanner is accessible in the PATH
                    def sonarScannerPath = sh(script: 'which sonar-scanner', returnStdout: true).trim()

                    if (sonarScannerPath) {
                        echo "Found sonar-scanner at ${sonarScannerPath}"
                    } else {
                        error "sonar-scanner is not found in the PATH"
                    }

                    // Run sonar-scanner analysis
                    sh '''
                    sonar-scanner -Dsonar.projectKey=mernbackendproject \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000 \
                    -Dsonar.token=${SONAR_TOKEN}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESSFULLY Built"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
