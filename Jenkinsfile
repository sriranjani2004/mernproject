pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  
    }
    
    environment {
        NODEJS_HOME = '/usr/local/bin/node'
        SONAR_SCANNER_PATH = '/Users/ariv/Downloads/sonar-scanner-6.2.1.4610-macosx-x64/bin/sonar-scanner'
        PROJECT_KEY = 'newprojectbackend'  // Use your desired project key here
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install and Build') {
            steps {
                sh '''
                # Ensure node_modules/.bin is in the PATH for local tools like ESLint
                export PATH=$PWD/node_modules/.bin:$PATH
                npm install
                npm run lint
                '''  
            }
        }

        stage('SonarCodeAnalysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')  
            }
            steps {
                sh '''
                # Ensure sonar-scanner is in the PATH
                export PATH=$SONAR_SCANNER_PATH:$PATH
                which sonar-scanner || echo "SonarQube scanner not found. Please install it."
                sonar-scanner -Dsonar.projectKey=$PROJECT_KEY \
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
