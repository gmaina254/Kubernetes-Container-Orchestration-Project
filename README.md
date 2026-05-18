# Kubernetes Container Orchestration Project

## Project Overview

This project demonstrates the deployment and management of a containerized Node.js web application using Kubernetes. The application was deployed inside a Kubernetes cluster running on KIND (Kubernetes in Docker) using GitHub Codespaces.

The project covers important Kubernetes concepts such as Deployments, Services, ConfigMaps, Secrets, Persistent Volumes, Horizontal Pod Autoscaling (HPA), and monitoring.

---

# Technologies Used

- Node.js
- Docker
- Kubernetes
- KIND
- GitHub Codespaces
- Docker Hub

---

# Project Objectives

The application was designed to:

- Run inside Kubernetes Pods managed by a Deployment
- Be exposed using a Kubernetes Service
- Use ConfigMaps and Secrets for configuration management
- Store data using Persistent Volumes and Persistent Volume Claims
- Scale automatically using Horizontal Pod Autoscaler (HPA)
- Monitor resource usage and logs using Kubernetes commands

---

# Kubernetes Cluster Setup

A Kubernetes cluster was created using KIND inside GitHub Codespaces.

## Verify Cluster

```bash
kubectl get nodes
```

---

# Application Containerization

The Node.js application was containerized using Docker.

## Build Docker Image

```bash
docker build -t mainamichael/k8s-node-app:v1 .
```

## Push Docker Image

```bash
docker push mainamichael/k8s-node-app:v1
```

Docker Image:

```text
mainamichael/k8s-node-app:v1
```

---

# Kubernetes Resources

The following Kubernetes resources were created:

| Resource | Purpose |
|---|---|
| Deployment | Manage application Pods |
| Service | Expose the application |
| ConfigMap | Store environment variables |
| Secret | Store sensitive information |
| Persistent Volume | Provide persistent storage |
| Persistent Volume Claim | Request storage |
| HPA | Automatically scale Pods |

---

# Deployment

The application was deployed using a Kubernetes Deployment with multiple replicas.

## Apply Deployment

```bash
kubectl apply -f deployment.yaml
```

## Check Deployment

```bash
kubectl get deployments
```

---

# ConfigMaps and Secrets

ConfigMaps and Secrets were used to manage application configuration and sensitive information.

## Apply ConfigMap and Secret

```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
```

---

# Persistent Storage

Persistent storage was implemented using Persistent Volumes (PV) and Persistent Volume Claims (PVC).

## Apply Storage Configuration

```bash
kubectl apply -f pv.yaml
kubectl apply -f pvc.yaml
```

## Verify Storage

```bash
kubectl get pv
kubectl get pvc
```

---

# Service Exposure

A Kubernetes Service was created to expose the application inside the cluster.

## Apply Service

```bash
kubectl apply -f service.yaml
```

## Verify Service

```bash
kubectl get svc
```

## Port Forwarding

```bash
kubectl port-forward service/node-service 3000:80
```

The application was then accessed through the browser using port 3000.

---

# Horizontal Pod Autoscaler (HPA)

Autoscaling was configured to automatically increase the number of Pods based on CPU usage.

## Create HPA

```bash
kubectl autoscale deployment node-app --cpu-percent=50 --min=2 --max=5
```

## Verify HPA

```bash
kubectl get hpa
```

---

# Monitoring and Troubleshooting

Kubernetes monitoring and troubleshooting commands were used throughout the project.

## Check Resource Usage

```bash
kubectl top pods
```

## View Logs

```bash
kubectl logs deployment/node-app
```

## Describe Pods

```bash
kubectl describe pod <pod-name>
```

---


# Results

The project successfully demonstrated:

- Kubernetes cluster setup
- Docker containerization
- Application deployment on Kubernetes
- Configuration management using ConfigMaps and Secrets
- Persistent storage implementation
- Autoscaling using HPA
- Monitoring and troubleshooting using Kubernetes tools

---

# Screenshots

The following screenshots were captured during the project:

- Kubernetes nodes
- Running Pods
- Services
- HPA scaling
- Resource monitoring
- Application logs
- Browser output of the application

---

# Conclusion

This project provided practical experience in deploying and managing containerized applications using Kubernetes. It demonstrated how Kubernetes handles scaling, storage, configuration management, and monitoring in a cloud-native environment.