# Kubernetes Container Orchestration Project

This repository demonstrates a simple Node.js application deployed to Kubernetes using common orchestration primitives.
It includes a Dockerfile, a Node.js Express app, and Kubernetes manifests for Deployment, Service, ConfigMap, Secret, PersistentVolume, and PersistentVolumeClaim.

## Project Overview

- **Application:** A Node.js Express app that returns a message and hostname.
- **Docker image:** Built from `k8s-project/Dockerfile`.
- **Kubernetes manifests:** Stored under `k8s/`.
- **Demonstrated concepts:** deployment scaling, environment configuration, secrets, persistent storage, and service exposure.

## Repository Structure

- `k8s-project/app.js` - Node.js app logic.
- `k8s-project/package.json` - Node.js dependencies and start script.
- `k8s-project/Dockerfile` - Docker image build instructions.
- `k8s/configmap.yaml` - ConfigMap for application configuration.
- `k8s/secret.yaml` - Secret for sensitive values.
- `k8s/pv.yaml` - PersistentVolume definition.
- `k8s/pvc.yaml` - PersistentVolumeClaim definition.
- `k8s/deployment.yaml` - Deployment definition with 2 replicas.
- `k8s/service.yaml` - ClusterIP Service exposing the application.

## Application Behavior

When the app receives a request at `/`, it:

1. Creates `/data` if needed.
2. Appends a visit log line to `/data/visits.txt`.
3. Responds with the configured message and pod hostname.

The app reads these Kubernetes-provided environment values:

- `APP_MESSAGE` from `ConfigMap`.
- `DB_PASSWORD` from `Secret`.

## Kubernetes Resources Explained

- `ConfigMap` (`app-config`): stores `APP_MESSAGE`.
- `Secret` (`app-secret`): stores `DB_PASSWORD` as base64.
- `PersistentVolume` (`app-pv`): hostPath-backed storage at `/tmp/app-data`.
- `PersistentVolumeClaim` (`app-pvc`): requests `500Mi` storage.
- `Deployment` (`node-app`): runs 2 replicas, injects ConfigMap and Secret values, mounts the PVC at `/data`, and sets CPU requests/limits.
- `Service` (`node-service`): exposes pods on port `80` and routes to container port `3000`.

## Prerequisites

- Docker or another container runtime.
- A Kubernetes cluster (Minikube, Kind, Docker Desktop, or cloud cluster).
- `kubectl` configured to the target cluster.
- Optionally, `docker` access to build and push images.

## Build and Deploy

1. Build the Docker image from the app folder:

```bash
cd k8s-project
docker build -t mainamichael/k8s-node-app:v1 .
```

2. If your Kubernetes cluster does not share the local Docker daemon, push the image to a registry:

```bash
docker push mainamichael/k8s-node-app:v1
```

3. Apply the Kubernetes manifests in the correct order:

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/pv.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Verification

Check that the pods, PVC, and service are running:

```bash
kubectl get pods
kubectl get pvc
kubectl get pv
kubectl get svc
```

View pod logs for deployment health:

```bash
kubectl logs -l app=node-app
```

To access the app from inside the cluster, use port forwarding:

```bash
kubectl port-forward svc/node-service 8080:80
```

Then open `http://localhost:8080` in a browser.

## Cleanup

Remove the deployed resources when finished:

```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/pvc.yaml
kubectl delete -f k8s/pv.yaml
kubectl delete -f k8s/secret.yaml
kubectl delete -f k8s/configmap.yaml
```

## Instructor Notes

- This project shows how Kubernetes separates configuration from code.
- It uses `ConfigMap` and `Secret` to pass environment values into pods.
- It uses a `PersistentVolumeClaim` to mount storage into a container and preserve logs across pod restarts.
- The Deployment has multiple replicas to demonstrate scaling and pod distribution.
- The Service is configured as `ClusterIP`, which is appropriate for internal cluster access.

## Key Learning Points

- Building and containerizing a Node.js app.
- Defining Kubernetes resources for app deployment.
- Externalizing configuration and secrets.
- Attaching persistent storage to a pod.
- Exposing the app through a Kubernetes Service.

## Notes

- The `Secret` value `DB_PASSWORD` is base64 encoded as `bXlwYXNzd29yZA==`, which decodes to `mypassword`.
- The app stores visit history at `/data/visits.txt`, which is backed by the mounted PVC.
- The `Deployment` image is `mainamichael/k8s-node-app:v1`; update the image tag if a different registry or tag is used.

---

If the instructor wants to test the application further, they can scale the deployment and watch how the Service load-balances traffic across replicas.
