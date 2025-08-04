
# 🚀 Random Selector App Deployment with Azure DevOps & Argo CD

This project demonstrates a full DevOps workflow using **Azure Cloud**, deploying a containerized application to **Azure Kubernetes Service (AKS)** with CI/CD handled by **Azure DevOps**, and GitOps with **Argo CD**.

---

## 🧰 Cloud Infrastructure Used


- A **Virtual Machine (VM)** is deployed (Ubuntu recommended) for self-hosted agent configuration.
- An **Azure Container Registry (ACR)** is created and accessible by AKS with attach-acr policy
- An **Azure Kubernetes Service (AKS)** cluster is configured and running. `az aks create --name random-app-aks --resource-group app2 --node-vm-size Standard_B2s --enable-addons monitoring --attach-acr random-app`
- `kubectl`, `docker`, and `git` are installed on the VM and configured.
- Azure CLI is installed and logged in with your Azure subscription.
- The AKS context is added using `aks get-credentials --name aks --resource-group new2`

---

## ⚙️ Prerequisites

- Azure subscription
- Azure DevOps organization/project
- A working AKS cluster
- Azure Container Registry (ACR) created and connected to AKS
- A deployed Azure VM (Linux) to act as a private Azure DevOps agent

---

## 📦 Setup & Pipeline Usage

### 1. Clone or Import Repo

Clone this repository or import it into your Azure DevOps project.

### 2. Setup Self-hosted Agent

On your deployed Azure VM:

```bash
# Create a directory and download agent package
mkdir myagent && cd myagent
wget https://vstsagentpackage.azureedge.net/agent/3.220.2/vsts-agent-linux-x64-3.220.2.tar.gz
tar zxvf vsts-agent-linux-x64-3.220.2.tar.gz

# Configure agent
./config.sh
# Then start the agent
./run.sh
````

> Make sure your VM has internet access and permissions to push to ACR.

### 3. Configure Pipeline

In Azure DevOps:

* Go to **Pipelines → New Pipeline**
* Use YAML file from repo: `azure-pipelines.yml`
* Modify the following variables to match your Azure setup:

  * `azureServiceConnection`
  * Change *pool* name with Agent name
  * `dockerRegistryServiceConnection`
  * `resourceGroup`
  * `aksClusterName`
  * `acrLoginServer`
  * Any branch or image-specific settings

### 4. Configure PAT (Personal Access Token)

* Go to **User Settings → Personal Access Tokens**
* Generate a new token with appropriate permissions (Code, Build, Release)
* In your pipeline, **add this PAT as a pipeline variable**, mark it as secret

---

## ✅ Run the Pipeline

* Save and run the pipeline
* It will:

  * Clone your repo
  * Build and push Docker image to ACR
  * Update Kubernetes deployment YAML with new image tag
  * Commit and push to Git
  * Sync with Argo CD (GitOps step)

---

## 🔄 Argo CD Setup (GitOps Deployment)

### 1. Install Argo CD

SSH into your AKS cluster or any admin machine with `kubectl` access:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 2. Expose Argo CD UI (for local/dev testing)

Expose Argo CD server using a LoadBalancer (not recommended for prod):

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Visit: [https://localhost:8080](https://localhost:8080)
#### OR 
```bash
kubectl get svc -n argocd
kubectl edit service/argocd-server
kubectl edit service/argocd-server -n argocd
```
Edit svc to NodePort or LoadBalancer


### 3. Login to Argo CD

```bash
# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
or go-to secrets
`kubectl get secret -n argocd`
`kubectl edit secret argocd-initial-admin-secret -n argocd`
Take your password
'echo <YOUR_PASSWORD> | base64 -d`


* Username: `admin`
* Password: above decoded value

Login via CLI:

```bash
argocd login localhost:8080
```

---

## 🔧 Configure Your App in Argo CD

### Step-by-step:

1. **Settings → Repositories** → Connect your Git repo (with access token if private)

2. **Applications → New App**

   * Give a name (e.g., `random-app`)
   * Select Git repo
   * Path: `k8s-file/`
   * Destination: your AKS cluster context & namespace
   * Sync Policy: automatic or manual

3. Click **Create** and watch Argo CD deploy your app automatically using the updated `Deployment.yml` from Git.

---

## 📌 Summary

* Azure DevOps handles CI/CD pipeline
* ACR stores your app Docker images
* AKS runs your container workloads
* Argo CD syncs your Kubernetes manifests from Git (GitOps)

---

## 🧩 Notes

* Ensure image paths are valid and AKS is authorized to pull from ACR
* Use `kubectl get pods` and `kubectl describe pod <pod-name>` for debugging


Let me know if you want the same as `README.md` format for uploading directly or if you'd like me to push this to your repo structure.
```
