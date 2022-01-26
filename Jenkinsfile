pipeline {
  agent {
    label "docker-agent"
  }
  environment {
    REGISTRY_AUTH = credentials('eec0f0c2-9b9d-4b26-8da5-58222499d901')
    DOTENV_PATH = credentials('unchained-dotenv')
    NEXT_PUBLIC_SHOW_CONTROL_PANEL = '1'
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
              adminui = docker.build("registry.ucc.dev/unchained/adminui"," --build-arg NEXT_PUBLIC_SHOW_CONTROL_PANEL=${NEXT_PUBLIC_SHOW_CONTROL_PANEL} -f ./Dockerfile .")
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
    stage('Deploy to Test') {
      when { branch 'develop' }
      steps {
        script {
          adminui.push("next")
        }
      }
    }
    stage('Deploy to Stage') {
      when { branch 'master' }
      steps {
        script {
          adminui.push("latest")
        }
      }
    }
    stage('Deploy to Unchained Cloud') {
      when { buildingTag() }
      steps {
        script {
          adminui.push("stable")
        }
      }
    }
  }
}
