pipeline {
    agent any
    
    environment {
        PATH = "C:\\Program Files\\nodejs"
    }

    tools {
        nodejs 'NodeJS'
    }


    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat '''
                npm install
                '''
            }
        }

        stage('Build'){
            steps{
                bat '''
                npm run build
                '''
            }
        }
        stage('SonarQube Analysis') {
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
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}