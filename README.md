# yamlChanger

This repository is a custom made solution that was conducted to allow the application CloudOverWatch (https://github.com/danielsilva2017/app-monitor) to change specific fields in a Kubernetes deployment/stateful (such as replicas, or cpu limit) in a yaml more easily, by just passing the variable and the value you want to change in a url. Then the yaml is changed.
It uses the Kubernetes Client Library (https://github.com/tenxcloud/node-kubernetes-client).

## Note

At the moment this repository still contains both solutions: before queue and the queue solution. The repository will suffer some cleaning soon




