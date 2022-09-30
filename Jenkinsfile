pipeline {
  agent {
    label "docker-agent"
  }
  environment {
    REGISTRY_AUTH = credentials('eec0f0c2-9b9d-4b26-8da5-58222499d901')
    DOTENV_PATH = credentials('unchained-dotenv')
    adminui = ''
  }
  tools { dockerTool "docker" }
  stages {
    stage('Login to Registry') {
      steps {
        script {
          sh 'docker login -u ${REGISTRY_AUTH_USR} -p ${REGISTRY_AUTH_PSW} registry.ucc.dev'
        }
      }
    }
    stage('Build') {
      stages {
        stage('Building') {
          steps{
            script {
              adminui = docker.build("registry.ucc.dev/unchained/adminui","-f ./Dockerfile .")
            }
          }
        }
        stage('Pushing to Registry') {
          steps {
            script {
              adminui.push("${GIT_BRANCH}-latest")
            }
          }
        }
      }
    }
    stage('Deploy v1') {
      when { branch 'v1.x' }
      steps {
        script {
          adminui.push("1")
        }
      }
    }
    stage('Deploy Next') {
      when { branch 'develop' }
      steps {
        script {
          adminui.push("next")
        }
      }
    }
    stage('Deploy Prod') {
      when { branch 'master' }
      steps {
        script {
          adminui.push("2")
          adminui.push("stable")
        }
      }
    }
  }
}
