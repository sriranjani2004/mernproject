pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Ensure NodeJS is configured properly
        sonarRunner 'SonarQube Scanner'  // Use 'sonarRunner' instead of 'sonarScanner'
    }
    
    environment {
        NODEJS_HOME = '/usr/local/bin/node'
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
                SONAR_TOKEN = credentials('sonar-token')  
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
            echo "Pipeline SUCCESSFULLY Build"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
