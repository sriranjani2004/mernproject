pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.18.1' 
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
                sh 'npm install'
                sh 'npm run lint'
            }
        }

        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')  
            }
            steps {
                  sh '''
export PATH=$PATH:/path/to/sonar-scanner/bin
sonar-scanner -Dsonar.projectKey=mernbackendproject \
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
