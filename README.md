
# Random Name Selector - Azure DevOps CI/CD with AKS

This project demonstrates a fully automated DevOps pipeline using **Azure cloud resources**. It utilizes **Azure Virtual Machines (VM)** for a self-hosted agent, **Azure Kubernetes Service (AKS)** for deployment, **Azure Container Registry (ACR)** for image storage, and Azure DevOps for CI/CD pipelines.

---

## 🛠️ Prerequisites

Before running this project, ensure the following Azure services are properly set up:

- ✅ A **Virtual Machine (VM)** is deployed (Ubuntu recommended) for self-hosted agent configuration.
- ✅ An **Azure Container Registry (ACR)** is created and accessible by AKS with attach-acr policy
- ✅ An **Azure Kubernetes Service (AKS)** cluster is configured and running. `az aks create --name random-app-aks --resource-group app2 --node-vm-size Standard_B2s --enable-addons monitoring --attach-acr random-app`
- ✅ `kubectl`, `docker`, and `git` are installed on the VM and configured.
- ✅ Azure CLI is installed and logged in with your Azure subscription.
- ✅ The AKS context is added using `aks get-credentials --name aks --resource-group new2`
`.

---

## 🚀 Getting Started

### Step 1: Clone or Import the Repository

Clone or import this repository into your **Azure DevOps project**.

```bash
git clone https://dev.azure.com/<your-org>/<your-project>/_git/<repo-name>
````

---

### Step 2: Configure a Self-Hosted Agent on Azure VM

Follow the agent doc in Azure devOps agent profile to set up a self-hosted agent on your Azure VM.

---

### Step 3: Set Up the Azure Pipeline

1. Navigate to the **Pipelines** section in Azure DevOps.
2. Use the provided `azure-pipeline.yml` file.
3. Modify the following variables inside the pipeline as per your Azure subscription:

   * `ACR_NAME`
   * `AKS_CLUSTER_NAME`
   * `RESOURCE_GROUP`
   * Any repository-specific paths or settings.

---

### Step 4: Configure Personal Access Token (PAT)

1. Go to **User Settings > Personal Access Tokens** in Azure DevOps.
2. Generate a PAT with at least **Code (Read & Write)** and **Build (Read & Execute)** scopes.
3. In your pipeline settings (under "Variables"):

   * Add a new variable named `PAT`
   * Paste the token as the value
   * Mark it as **secret**

---

### Step 5: Run the Pipeline

Once everything is configured:

* Trigger the pipeline manually or automatically on commit.
* Verify that all stages complete successfully.
* Monitor your AKS cluster using:

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

---

## ✅ Notes

* Modify the Kubernetes deployment manifest (`k8s-file/Deployment.yml`) to suit your image naming and ports.
* This repo uses a shell script (`Update-k8s-Manifest.sh`) to update the image tag dynamically using the pipeline build ID.
* Ensure that your AKS has the correct permissions to pull from ACR.

---

## 📦 Tech Stack

* Azure DevOps
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* Azure VM (Self-Hosted Agent)
* Docker
* Git
* Bash scripting


