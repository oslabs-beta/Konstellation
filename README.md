# Konstellation

##Summary
Konstellation is a Distributed Tracing tool for AWS EKS Kubernetes clusters.

This tool gathers telemetry data within a kubernetes cluster and displays the connections in an easy to understand display.

# Getting Started
Prerequisites:
- [ ] Kubectl Installed
- [ ] Distributed Tracing
- [ ] Opentelemetry collector and operator deployed on the cluster
- [ ] Opentelemetry instrumentation integrated within your app.
- [ ] Jaeger All-in-One deployed on the cluster
- [ ] cert-manager installed


*Note*
- If your App is not instrumented with Opentelemetry instrumentation, the following instructions will instrument a NodeJS, Python, or Java app with Opentelemetry Autoinstrumentation. Do note that errors may arise do due to a known issue with NodeJS native fetch and Opentelemetry's Autostrumentation, inter-pod traces will not correctly propagate.

# Installing Kubectl
- instructions to install kubectl here

# Installing cert-manager
- Insert linke to cert-manager here

# Setting up Opentelemetry Operator and Collector
- Insert Opentelemetry Operator github and link to opentelemetry's website here
To install the operator and collector. Please ensure cert-manager is installed.
# Setting up Opentelemetry Autoinstrumentaion
- Only required if your app does not have Opentelemetry's Autoinstrumentation built in.

# Setting up Jaeger All-in-One
- Link to Jaeger's website here
Essentially


# Running the Electron App
```
npm install
npm run build
```
```
NPM run server-prod
```
Then on a different terminal run
```
NPM run electron-start
```

#Using Konstellation
1. On successfull startup, if you are not connected 
