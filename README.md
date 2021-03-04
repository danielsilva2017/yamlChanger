# yamlChanger

This repository is a custom made API that was conducted to interact with the the application application CloudOverWatch (https://github.com/danielsilva2017/app-monitor):

* To change specific fields in a Kubernetes deployment/stateful (such as replicas, or cpu limit) in a yaml more easily, by just passing the variable and the value you want to change in a url. Then the yaml is changed. It uses a public NodeJS Kubernetes client library  "node-kubernetes-client" (https://github.com/tenxcloud/node-kubernetes-client) to simplify handling calls to the Kubernetes API.

* Controls when you can changes with a queue;

*  Allows to add more images to processes ;  (/image)
*  Start and stop a new orchestraction monitoring -using sysquery files); (/start and /stop)

Yaml is a part of CloudOverWatch, you need to have also inthe same environment:
- [x]  CloudOverWatch - main gui
- [x] Access granted to use sysquery - agents that collect data from Kubernetes and store it on neo4j.



## Note

At the moment this repository still contains both solutions: before queue and the queue solution. The repository will suffer some cleaning soon




