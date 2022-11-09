# Konstellation

##Summary
Konstellation is a Distributed Tracing tool for AWS EKS Kubernetes clusters.

This tool gathers telemetry data within a kubernetes cluster and displays the connections in an easy to understand display.

# Getting Started
Prerequisites:
- [ ] Kubectl Installed
- [ ] cert-manager installed
- [ ] Opentelemetry collector and operator deployed on the cluster
- [ ] Opentelemetry instrumentation integrated within your app.
- [ ] Jaeger deployed on the cluster


*Note*
- If your App is not instrumented with Opentelemetry instrumentation, the following instructions will instrument a NodeJS, Python, or Java app with Opentelemetry Autoinstrumentation. Do note that errors may arise do due to a known issue with NodeJS native fetch and Opentelemetry's Autostrumentation, inter-pod traces will not correctly propagate.


# Installing Kubectl
- Instructions to install kubectl [here](https://kubernetes.io/docs/tasks/tools/)

## Install with Homebrew on macOS
If you are on macOS and using [Homebrew](http://brew.sh) package manager, you can install kubectl with Homebrew.
1. Run the installation command:

```
brew install kubectl
```

or

```
brew install kubernetes-cli
```

2. Test to ensure the version you installed is up-to-date:

```
kubectl version --client
```

//DO WE HAVE TO INCLUDE INSTRUCTIONS ON HOW TO CONNECT HOMEBREW TO AWS EKS?

# Installing cert-manager
- Instructions to installing `cert-manager` [here](https://cert-manager.io/docs/installation/)

To install run:

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.10.0/cert-manager.yaml
```

# Setting up Opentelemetry Operator and Collector
- Insert Opentelemetry Operator github and link to opentelemetry's website here
To install the operator and collector. Please ensure cert-manager is installed.

## (Optiontal) Install Via Helm chart
You can install Opentelemetry Operator via [Helm Chart](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator) from the opentelemetry-helm-charts repository. More information is available in [here](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-operator).

## Install Opentelemetry Operator
Once cert-manager is installed:
```bash
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```
Once the `opentelemetry-operator` deployment is ready, create an OpenTelemetry Collector (otelcol) instance:

The OpenTelemetry collector file is provided in the Yamlfiles Folder. Navigate to the Yamlfiles Folder and run the following command: 

```
kubectl apply -f opentelemetryCollector.yaml
```



```yaml
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: otel-collector
spec:
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
          http:
    processors:
      memory_limiter:
        check_interval: 1s
        limit_percentage: 75
        spike_limit_percentage: 15
      batch:
        send_batch_size: 10000
        timeout: 10s

    exporters:
      logging:
      jaeger:
        endpoint: jaeger-collector:14250
        tls:
          insecure: true

    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: []
          exporters: [logging, jaeger]
EOF
```



# Setting up Opentelemetry Autoinstrumentation Injection
- Only required if your app does not have Opentelemetry's Autoinstrumentation built in.

The operator can inject and configure OpenTelemetry auto-instrumentation libraries. Currently DotNet, Java, NodeJS and Python are supported.

To use auto-instrumentation, configure an `Instrumentation` resource with the configuration for the SDK and instrumentation.

```yaml
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: my-instrumentation
spec:
  exporter:
    endpoint: http://otel-collector:4317
  propagators:
    - tracecontext
    - baggage
    - b3
  sampler:
    type: parentbased_traceidratio
    argument: "0.25"
EOF
```

Alternatively, the YAML file is provided in the YAML files folder.

Navigate to the YAMLfiles folder and run the following command to apply the yaml file.

```bash
kubectl apply -f autoinstrumentation.yaml
```



# Setting up Jaeger Operator
- Documentation to set up the Jaeger Operator on a Kubernetes cluster [here](https://www.jaegertracing.io/docs/1.39/operator/)

To install the Jaeger Operator. Please ensure cert-manager is installed.

To Install the Operator, run: 

```
kubectl create namespace observability # <1>
kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.39.0/jaeger-operator.yaml -n observability # <2>

```

This will create the Jaeger Operator in the observability namespace

//instructions to create a jaeger instance here. (Include the yaml file)

// Also in the YAML file, include the service so that it automatically exposes the correct jaeger port.

## Port-Forwarding Jaeger

To access the Jaeger instance from your cloud. 

```bash

kubectl apply -f -- 

```
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

# DELETE LATER
WHAT WE SHOULD DO:
PUT ALL THE YAML FILES IN A BIG FOLDER SO THAT THEY CAN JUST RUN 

```bash
kubect apply -f ./KonstellationYaml
```


# Using Konstellation
1. On successfull startup, if you are not connected please enter your AWS credentials
2. To view a list of traces click on the table tab at the bottom of the screen.
3. To view a specific trace, click on the trace ID on the table.
4. To view a specific trace, if the trace Id is known, enter the traceId at the search bar on the top and click submit.
5. To return to the clusterView click on the clusterView button.
