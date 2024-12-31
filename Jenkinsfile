pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Ensure NodeJS is configured properly
        sonarRunner 'SonarQube Scanner'  // Correct tool name for SonarQube Scanner in Jenkins
    }
    
    environment {
        NODEJS_HOME = '/usr/local/bin/node'
        PATH = "/Users/ariv/Downloads/sonar-scanner-6.2.1.4610-macosx-x64/bin:$PATH"  // Ensure SonarScanner is in PATH
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
            environment {
                SONAR_TOKEN = credentials('sonar-token')  // Ensure SonarQube token is stored in Jenkins credentials
            }
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
            echo "Pipeline SUCCESSFULLY Built"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
