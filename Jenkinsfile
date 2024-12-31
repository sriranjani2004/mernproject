pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.18.1' // Ensure this tool is configured in Jenkins
    }

    environment {
        NODEJS_HOME = '/usr/local/bin/node'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"  // Ensure Node.js is in the PATH
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
                npm install -g sonar-scanner  // Optional: Install sonar-scanner globally if needed
                npm run lint'''
            }
        }

        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')  
            }
            steps {
                sh '''
                sonar-scanner -Dsonar.projectKey=mern-backend \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.token=${SONAR_TOKEN}
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
