pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  
    }
    
    environment {
        NODEJS_HOME = 'C:\\Program Files\\nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install and Build') {
            steps {
                bat '''npm install
                npm run lint'''  
            }
        }

        
        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonarqube-token')  
            }
            steps {
                bat '''
                sonar-scanner -Dsonar.projectKey=mern-backend ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.token=%SONAR_TOKEN% 
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESSFULLY Build"
        }
        failure {
            echo " Pipeline failed"
        }
    }
}