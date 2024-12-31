pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Ensure NodeJS is configured properly
    }
    
    environment {
        SONAR_SCANNER_HOME = '/Users/ariv/Downloads/sonar-scanner-6.2.1.4610-macosx-x64'
        PATH = "$SONAR_SCANNER_HOME/bin:$PATH"
        SONAR_TOKEN = credentials('sonar-token')  // Make sure the token is stored in Jenkins Credentials
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install and Build') {
            steps {
                sh '''npm install
                npm run lint'''  
            }
        }

        stage('SonarCodeAnalysis') {
            steps {
                sh '''
                sonar-scanner -Dsonar.projectKey=mernbackendpro \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.token=$SONAR_TOKEN
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESSFULLY Build"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
