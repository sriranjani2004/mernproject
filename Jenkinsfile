pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.18.1'  
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
                bat '''npm install
                npm run lint'''  
            }
        }

        
        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')  
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
